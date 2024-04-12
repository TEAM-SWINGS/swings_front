import React, { useState } from "react";
import { Link } from "react-router-dom";
import dummyData from "../dummyData";

function Header({ onSelectTeam }) { // 부모 컴포넌트로 선택된 팀 정보 전달
  const [selectedTeam, setSelectedTeam] = useState(""); // 선택된 구단 상태

  // // 선택된 구단을 업데이트하는 함수
  // const selectTeam = (team) => {
  //   setSelectedTeam(team);
  //   onSelectTeam(team); // 선택된 팀 정보를 부모 컴포넌트로 전달
  // };

  // onSelectTeam prop이 없을 경우를 대비하여 빈 함수를 설정
  const handleSelectTeam = (team) => {
    setSelectedTeam(team);
    // onSelectTeam 함수가 존재하는 경우에만 호출
    if (typeof onSelectTeam === 'function') {
      onSelectTeam(team);
    }
  };

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img src="https://swings.s3.ap-northeast-2.amazonaws.com/title_swings.png" alt="Title" className="h-10" />
          </Link>
          <div className="flex items-center lg:order-2">
            <Link
              to="/login"
              className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              Log in
            </Link>
            <button
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
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
          <div className="flex justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {/* 전체 보기 버튼 */}
              <li>
                <a
                  href="#"
                  onClick={() => handleSelectTeam("")} // 전체보기를 클릭할 때 선택된 구단 상태를 초기화
                  className={`block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 ${selectedTeam === "" ? "text-primary-700" : "text-gray-700"}`}
                >
                  전체
                </a>
              </li>
              {/* 구단별 버튼 */}
              {dummyData.posts.reduce((acc, post) => {
                // 팀 이름에서 " " 이후의 부분을 자르기
                const teamName = post.team.split(" ")[0];
                if (!acc.includes(teamName)) {
                  acc.push(teamName);
                }
                return acc;
              }, []).map((team) => (
                <li key={team}>
                  <a
                    href="#"
                    onClick={() => handleSelectTeam(team)} // 각 구단을 클릭할 때 선택된 구단 상태 업데이트
                    className={`block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 ${selectedTeam === team ? "text-primary-700" : "text-gray-700"}`}
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
