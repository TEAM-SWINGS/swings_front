import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header({ onSelectTeam}) {

  // 부모 컴포넌트로 선택된 팀 정보 전달
  const [selectedTeam, setSelectedTeam] = useState(""); // 선택된 구단 상태
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn"));
  const navigate = useNavigate();

  // 타이틀 클릭 시 이동 후 새로고침
  const titleLinkClick = () => {
    navigate("/");
    window.location.reload();
  };

  // 전체 구단 핸들러
  const handleSelectAll = async () => {
    try {
      const response = await fetch(`http://192.168.240.43:8080/api/posts`);
      if (response.ok) {
        const data = await response.json();
        setSelectedTeam(""); // 선택된 팀 정보 초기화
        onSelectTeam(""); // 선택된 팀 정보를 부모 컴포넌트로 전달
      } else {
        throw new Error('게시글을 가져오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('게시글을 가져오는 중 오류가 발생했습니다:', error);
      // 오류 처리
    }
  };

  
  // 팀 선택 핸들러
  const handleSelectTeam = (team) => {
    setSelectedTeam(team);
    onSelectTeam(team); // 선택된 팀 정보를 부모 컴포넌트로 전달
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
  localStorage.removeItem('isLoggedIn');
  setIsLoggedIn(false);
  navigate("/");
  };

  const handleToggleNav = () => {
    setIsNavOpen(!isNavOpen);
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
            {/* 팀 선택 리스트 */}
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
              {/* 구단명 자르기 */}
              {["KIA 타이거즈", "두산 베어스", "롯데 자이언츠", "삼성 라이온즈", "한화 이글스", "NC 다이노스", "키움 히어로즈", "KT 위즈", "LG 트윈스", "SSG 랜더스"].map((teamName) => {
                const shortTeamName = teamName.substring(0, teamName.indexOf(' '));
                return (
                  <li key={shortTeamName} className="cursor-pointer hover:bg-gray-100 p-1 rounded-sm">
                      <a
                          onClick={() => handleSelectTeam(shortTeamName)}
                          className={`block py-2 px-3 text-gray-900 rounded md:hover:bg-transparent md:border-0 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${selectedTeam === shortTeamName ? "text-primary-700" : "text-gray-700"}`}
                      >
                          {shortTeamName}
                      </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
export default Header;