import React, { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";

function Board({ }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
  const postsPerPage = 10; // 페이지 당 게시물 수
  const [isNavOpen, setIsNavOpen] = useState(false);


  const changeUrlParams = (key, value) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(key, value);
    setSearchParams(newSearchParams);
  }
  
  // 로그인 상태 확인
  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(storedLoggedIn === 'true');
  }, []);

  // 게시글 드롭다운 토글
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // 서버에서 현재 페이지에 해당하는 게시물 가져오기
  const fetchPosts = async () => {
    try {
      const response = await fetch(
        `http://192.168.240.43:8080/api/posts?page=${currentPage -1}&size=${postsPerPage}`
      );
      if (response.ok) {
        const data = await response.json();
        setPosts(data.content);
        setTotalPages(data.totalPages);
      } else {
        throw new Error("게시글을 가져오는 데 실패했습니다.");
      }
    } catch (error) {
      console.error("게시글을 가져오는 중 오류가 발생했습니다:", error);
      // 오류 처리
    }
  };

  // 초기 렌더링 시 게시물 가져오기
  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  // 게시글 필터링 함수
  const filterPosts = (criteria) => {
    changeUrlParams('sort', criteria);
    let sortedPosts;
    // 조회수 내림차순 정렬
    if (criteria === 'views') {
      sortedPosts = [...posts].sort((a, b) => b.views - a.views);
    // 작성일자 내림차순 정렬
    } else if (criteria === 'createdate') {
      sortedPosts = [...posts].sort((a, b) => new Date(b.createdate) - new Date(a.createdate));
    // 기본값은 원래의 순서 유지
    } else {
      sortedPosts = [...posts];
    }
    // 정렬된 게시글로 상태 업데이트
    setPosts(sortedPosts);
    // 드롭다운 닫기
    setIsDropdownOpen(false);
  };

  // 날짜 형식 바꾸기
  const formatDate = (dateString) => {
    // dateString을 Date 객체로 변환
    const date = new Date(dateString);
  
    // 날짜, 월, 년도 추출
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
  
    // 시간, 분, 초 추출
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
  
    // 날짜와 시간을 각각 원하는 형식으로 조합하여 문자열 반환
    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  
    return formattedDate;
  };

  // 이전 페이지로 이동
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 다음 페이지로 이동
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // 시작 페이지와 끝 페이지 계산
  const pagesPerPage = 10; // 한 번에 보이는 페이지 수
  const lastPage = Math.ceil(posts.length / postsPerPage);
  const startPage = Math.floor((currentPage - 1) / pagesPerPage) * pagesPerPage + 1;
  const endPage = Math.min(startPage + pagesPerPage - 1, totalPages);

  // // 부모 컴포넌트로 선택된 팀 정보 전달
  const [selectedTeam, setSelectedTeam] = useState(""); // 선택된 구단 상태

  // 전체 보기 핸들러
  const handleSelectAll = async () => {
    try {
      const response = await fetch(`http://192.168.240.43:8080/api/posts`);
      if (response.ok) {
        const data = await response.json();
        setPosts(data.content);
        setTotalPages(data.totalPages);
        setSelectedTeam(""); // 선택된 팀 정보 초기화
      } else {
        throw new Error('게시글을 가져오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('게시글을 가져오는 중 오류가 발생했습니다:', error);
      // 오류 처리
    }
  };

  
  // 팀 선택 핸들러
  const handleSelectTeam = async (team) => {
    try {
      const response = await fetch(`http://192.168.240.43:8080/api/posts?team=${team}`);
      if (response.ok) {
        const data = await response.json();
        setPosts(data.content);
        setTotalPages(data.totalPages);
        setSelectedTeam(team);
      } else {
        throw new Error('게시글을 가져오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('게시글을 가져오는 중 오류가 발생했습니다:', error);
      // 오류 처리
    }
  };

  
  const handleToggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
      

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            {/* 게시판 헤더 */}
            <div className="flex flex-col items-center justify-between space-y-3 md:space-y-3 md:space-x-4 p-4">
              <div>
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
              {isLoggedIn ? (
                <>
                  {/* 검색 폼 */}
                  <div className="w-full md:w-1/2">
                    <form className="flex items-center">
                      <label htmlFor="simple-search" className="sr-only">Search</label>
                      <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <input type="search" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required="" />
                        <button type="submit" class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-gray-700 rounded-e-lg border border-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                          <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                          </svg>
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    {/* 글쓰기 버튼 */} 
                    <Link to="/postformpage">
                      <button className="w-full flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                        글 쓰기
                      </button>
                    </Link>
                    {/* 게시글 필터 */}
                    <div className="w-full md:w-auto relative">
                      <button 
                        className="w-full flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" 
                        type="button"
                        onClick={toggleDropdown}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-4 w-4 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd"></path>
                        </svg>
                        Filter
                        <svg className="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                      </button>
                      {/* 게시글 필터 리스트 */}
                      {isDropdownOpen && (
                        <div id="filterDropdown" className="z-10 mt-1 absolute top-full left-0 w-full p-3 bg-white rounded-lg shadow dark:bg-gray-700">
                          <ul className="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
                          <li className="flex items-center cursor-pointer" onClick={() => filterPosts('createdate')}>
                            <span className="mr-2 text-gray-900 dark:text-gray-100">최신순</span>
                          </li>
                            <li className="flex items-center cursor-pointer" onClick={() => filterPosts('views')}>
                              <span className="mr-2 text-gray-900 dark:text-gray-100">조회순</span>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : null}
            </div>
            {/* 게시판 헤더 및 목록 */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-center">구단명</th>
                    <th scope="col" className="px-4 py-3 text-center">제목</th>
                    <th scope="col" className="px-4 py-3 text-center">작성자</th>
                    <th scope="col" className="px-4 py-3 text-center">조회수</th>
                    <th scope="col" className="px-4 py-3 text-center">날짜</th>
                  </tr>
                </thead>
                <tbody>
                  {/* 선택된 팀의 게시물 렌더링 */}
                  {posts.map((post) => (
                    <tr key={post.id} className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                        <Link to={`/postpage/${post.id}`}>{post.teamfield}</Link>
                      </td>
                      <td className="px-4 py-3">
                        <Link to={`/postpage/${post.id}`}>{post.title}</Link>
                      </td>
                      <td className="px-4 py-3 text-center">{post.nickname}</td>
                      <td className="px-4 py-3 text-center">{post.views}</td>
                      <td className="px-4 py-3 text-center">{formatDate(post.createdate)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* 페이지네이션 */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Showing
                    <span className="font-semibold text-gray-900 dark:text-white">{(currentPage - 1) * postsPerPage + 1}-{Math.min(currentPage * postsPerPage, posts.length)}</span>
                    of
                    <span className="font-semibold text-gray-900 dark:text-white">{totalPages}</span>
                </span>
                <ul className="inline-flex items-stretch -space-x-px">
                    <li>
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            <span className="sr-only">Previous</span>
                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </li>
                    {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                        <li key={startPage + index}>
                            <button
                                onClick={() => setCurrentPage(startPage + index)}
                                className={`flex items-center justify-center text-sm py-2 px-3 leading-tight ${
                                    startPage + index === currentPage
                                        ? 'text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                                        : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                                }`}
                            >
                                {startPage + index}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            <span className="sr-only">Next</span>
                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </li>
                </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Board;
