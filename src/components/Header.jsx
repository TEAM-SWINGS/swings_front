import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header({ onSelectTeam}) {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn"));
  const navigate = useNavigate();
  
  // 타이틀 클릭 시 이동 후 새로고침
  const titleLinkClick = () => {
    navigate("/");
    window.location.reload();
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate("/");
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
              <>
                <Link
                  className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                  onClick={() => { handleLogout(); localStorage.clear(); window.location.reload(); }}
                  >
                  로그아웃
                </Link>
                <Link to='/changepwdpage'>비밀번호 변경
                </Link>
              </>
            ):(
              <Link
                to="/login"
                className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                로그인
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
export default Header;