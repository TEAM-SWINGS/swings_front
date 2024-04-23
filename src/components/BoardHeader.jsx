// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// function BoardHeader({ handleSelectAll, isDropdownOpen, selectedTeam }) {
//     const [isNavOpen, setIsNavOpen] = useState(false);
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     useEffect(() => {
//         const storedLoggedIn = localStorage.getItem("isLoggedIn");
//         setIsLoggedIn(storedLoggedIn === "true");

//         if (storedLoggedIn === "true") {
//         const storedUserId = localStorage.getItem("id");
//         setStoredUserId(storedUserId);
//         }
//     }, []);

//         // 게시글 드롭다운 토글
//     const toggleDropdown = () => {
//         setIsDropdownOpen(!isDropdownOpen);
//     };

//     const handleToggleNav = () => {
//         setIsNavOpen(!isNavOpen);
//       };

//     // 전체 보기 핸들러
//     const handleSelectAll = async () => {
//         setSelectedTeam(""); // 선택된 구단 초기화
//         await fetchPostsByParams(`http://192.168.240.43:8080/api/posts`);
//     };

//     // 팀 선택 핸들러 수정
//     const handleSelectTeam = async (team) => {
//         setSelectedTeam(team);
//         await fetchPostsByParams(`http://192.168.240.43:8080/api/posts?team=${team}`);
//     };

//     // 게시글 필터링
//     const filterPosts = (criteria) => {
//         changeUrlParams('sort', criteria);
//         let sortedPosts;
//         // 조회수 내림차순 정렬
//         if (criteria === 'views') {
//             sortedPosts = [...posts].sort((a, b) => b.views - a.views);
//         // 작성일자 내림차순 정렬
//         } else if (criteria === 'createdate') {
//             sortedPosts = [...posts].sort((a, b) => new Date(b.createdate) - new Date(a.createdate));
//         // 기본값은 원래의 순서 유지
//         } else {
//             sortedPosts = [...posts];
//         }
//         // 정렬된 게시글로 상태 업데이트
//         setPosts(sortedPosts);
//         setIsDropdownOpen(false);
//     };
    
//     // 날짜 형식 바꾸기
//     const formatDate = (dateString) => {
//         // dateString을 Date 객체로 변환
//         const date = new Date(dateString);
      
//         // 날짜, 월, 년도 추출
//         const day = date.getDate();
//         const month = date.getMonth() + 1;
//         const year = date.getFullYear();
      
//         // 시간, 분, 초 추출
//         const hours = date.getHours();
//         const minutes = date.getMinutes();
//         const seconds = date.getSeconds();
      
//         // 날짜와 시간을 각각 원하는 형식으로 조합하여 문자열 반환
//         const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
      
//         return formattedDate;
//       };


    
  
//     return (
//         <div className="flex flex-col items-center justify-between space-y-3 md:space-y-3 md:space-x-4 p-4">
//             <div>
//                 <button
//                 type="button"
//                 className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//                 aria-expanded={isNavOpen ? "true" : "false"}
//                 onClick={handleToggleNav}
//                 >
//                 <svg
//                     className="w-6 h-6"
//                     aria-hidden="true"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                     xmlns="http://www.w3.org/2000/svg"
//                 >
//                     <path
//                     fillRule="evenodd"
//                     d="M3 5a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
//                     clipRule="evenodd"
//                     ></path>
//                 </svg>
//                 </button>
//                 <div className={`w-full mt-3 md:block md:w-auto ${isNavOpen ? "" : "hidden"}`} id="navbar-default">
//                 <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
//                     <li className="cursor-pointer hover:bg-gray-100 p-1 rounded-sm">
//                     <a
//                         onClick={handleSelectAll}
//                         className={`font-bold hover:bg-gray-100 block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${
//                         selectedTeam === "" ? "text-primary-700" : "text-gray-700"
//                         }`}
//                         aria-current={selectedTeam === "" ? "page" : undefined}
//                     >
//                         전체
//                     </a>
//                     </li>
//                     {["KIA 타이거즈", "두산 베어스", "롯데 자이언츠", "삼성 라이온즈", "한화 이글스", "NC 다이노스", "키움 히어로즈", "KT 위즈", "LG 트윈스", "SSG 랜더스"].map((teamName) => {
//                     const shortTeamName = teamName.substring(0, teamName.indexOf(" "));
//                     return (
//                         <li key={shortTeamName} className="cursor-pointer hover:bg-gray-100 p-1 rounded-sm">
//                         <a
//                             onClick={() => handleSelectTeam(shortTeamName)}
//                             className={`block py-2 px-3 text-gray-900 rounded md:hover:bg-transparent md:border-0 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${
//                             selectedTeam === shortTeamName ? "text-primary-700" : "text-gray-700"
//                             }`}
//                         >
//                             {shortTeamName}
//                         </a>
//                         </li>
//                     );
//                     })}
//                 </ul>
//                 </div>
//             </div>
//             {isLoggedIn ? (
//                 <>
//                 <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
//                     <Link to="/postformpage">
//                     <button className="w-full flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
//                         글 쓰기
//                     </button>
//                     </Link>
//                     <div className="w-full md:w-auto relative">
//                     <button
//                         className="w-full flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
//                         type="button"
//                         onClick={toggleDropdown}
//                     >
//                         <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-4 w-4 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd"></path>
//                         </svg>
//                         Filter
//                         <svg className="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
//                         <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
//                         </svg>
//                     </button>
//                     {isDropdownOpen && (
//                         <div id="filterDropdown" className="z-10 mt-1 absolute top-full left-0 w-full p-3 bg-white rounded-lg shadow dark:bg-gray-700">
//                         <ul className="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
//                             <li className="flex items-center cursor-pointer" onClick={() => filterPosts("createdate")}>
//                             <span className="mr-2 text-gray-900 dark:text-gray-100">최신순</span>
//                             </li>
//                             <li className="flex items-center cursor-pointer" onClick={() => filterPosts("views")}>
//                             <span className="mr-2 text-gray-900 dark:text-gray-100">조회순</span>
//                             </li>
//                         </ul>
//                         </div>
//                     )}
//                     </div>
//                 </div>
//                 </>
//             ) : null}
//         </div>
//     );
// }

// export default BoardHeader;
