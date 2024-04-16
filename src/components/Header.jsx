import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import dummyData from "../dummyData";

function Header({ onSelectTeam = () => {}  }) { // 부모 컴포넌트로 선택된 팀 정보 전달
  const [selectedTeam, setSelectedTeam] = useState(""); // 선택된 구단 상태
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // 타이틀 클릭 시 이동 후 새로고침
  const titleLinkClick = () => {
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(storedLoggedIn === 'true');
  }, []); // 빈 배열을 넘겨주면 컴포넌트가 마운트될 때 한 번만 실행

  // 로그아웃 핸들러
  const handleLogout = () => {
  localStorage.removeItem('isLoggedIn');
  setIsLoggedIn(false);
  navigate("/");
  };

  const handleToggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  
  const handleSelectAll = () => {
    setSelectedTeam(""); // 선택된 팀을 빈 문자열("")로 설정
    onSelectTeam(""); // 전체 팀 정보를 부모 컴포넌트로 전달
  };
  
  // 선택된 구단을 업데이트하는 함수
  const handleSelectTeam = (team) => {
    setSelectedTeam(team);
    onSelectTeam(team); // 선택된 팀 정보를 부모 컴포넌트로 전달
  };

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 dark:bg-gray-900">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center" onClick={titleLinkClick}>
            <img src="https://swings.s3.ap-northeast-2.amazonaws.com/title_swings.png" alt="Title" className="h-10" />
          </Link>
          <div className="flex items-center lg:order-2">

            {isLoggedIn ? (
              <Link
                className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                onClick={() => { handleLogout(); window.location.reload(); }}
                >
                로그아웃
              </Link>
            ):(
              <Link
                to="/login"
                className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                로그인
              </Link>
            )}
            {/* 반응형 네비바 버튼 */}
            <button
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-expanded={isNavOpen ? "true" : "false"}
              onClick={handleToggleNav}
              >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                  ></path>
              </svg>
            </button>
          </div>
          <div className={`w-full mt-3 md:block md:w-auto ${isNavOpen ? '' : 'hidden'}`} id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {/* 전체 보기 버튼 */}
              <li className="cursor-pointer hover:bg-gray-100 p-1 rounded-sm">
                <a
                  onClick={handleSelectAll}
                  className={`font-bold hover:bg-gray-100 block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${selectedTeam === "" ? "text-primary-700" : "text-gray-700"}`}
                  aria-current={selectedTeam === "" ? "page" : undefined}
                >
                  전체
                </a>
              </li>
              {/* 구단별 버튼 */}
              {dummyData.posts.reduce((acc, post) => {
                const teamName = post.teamField.split(" ")[0];
                if (!acc.includes(teamName)) {
                  acc.push(teamName);
                }
                return acc;
              }, []).map((team) => (
                <li key={team} className="cursor-pointer hover:bg-gray-100 p-1 rounded-sm">
                  <a
                    onClick={() => handleSelectTeam(team)}
                    className={`block py-2 px-3 text-gray-900 rounded md:hover:bg-transparent md:border-0 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${selectedTeam === team ? "text-primary-700" : "text-gray-700"}`}
                  >
                    {team}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
