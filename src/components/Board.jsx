import React, { useState, useEffect, useMemo } from "react";
import dummyData from "../dummyData";
import { Link, useSearchParams } from "react-router-dom";

function Board({ selectedTeam }) {
  const [searchParams, setSearchParams] = useSearchParams();
  // const sort = searchParams.get('sort');
  // const [page, setPage] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [posts, setPosts] = useState(dummyData.posts);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const totalPages = Math.ceil(dummyData.posts.length / postsPerPage);


  const changeUrlParams = (key, value) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(key, value);
    setSearchParams(newSearchParams);
  }
  
  // 로그인 유무
  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(storedLoggedIn === 'true');
  }, []);

  // 게시글 토글
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  // 현재 페이지의 게시물 가져오기
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // const fetchData = async () => {
  //   const newSearchParams = new URLSearchParams();
  //   newSearchParams.set('sort', sort);
  //   const response = await fetch(`https://api.com/posts?${newSearchParams.toString()}`, {
  //     method: 'GET',
      
  //   });
  //   const data = await response.json();
  //   const list = data.list;
  //   setPosts(list);
  // }


  // 선택된 팀에 해당하는 게시물 필터링

  // useEffect(() => {
  //   fetchData();
  // }, [searchParams]);
  
  useEffect(() => {
    const allPosts = dummyData.posts;
    if (selectedTeam) {
      setPosts(allPosts.filter(post => post.teamField.includes(selectedTeam)))
    } else {
      setPosts(allPosts);
    }
  }, [selectedTeam]);

  // 게시글 정렬 함수
  const filterPosts = (criteria) => {
    changeUrlParams('sort', criteria);
    let sortedPosts;
    // 조회수 내림차순 정렬
    if (criteria === 'views') {
      sortedPosts = [...posts].sort((a, b) => b.views - a.views);
      // 작성일자 내림차순 정렬
    } else if (criteria === 'createdAt') {
      sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      // 기본값은 원래의 순서 유지
    } else {
      sortedPosts = [...posts];
    }
    // 정렬된 게시글로 상태 업데이트
    setPosts(sortedPosts);
    // 드롭다운 닫기
    setIsDropdownOpen(false);
  };
  
  // 페이지 변경
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 다음 페이지로 이동
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // 이전 페이지로 이동
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 시작 페이지와 끝 페이지 계산
  const pagesPerPage = 10; // Number of pages to show in pagination
  const lastPage = Math.ceil(posts.length / postsPerPage);
  const startPage = Math.floor((currentPage - 1) / pagesPerPage) * pagesPerPage + 1;
  const endPage = Math.min(startPage + pagesPerPage - 1, totalPages);

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            {/* 게시판 헤더 */}
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
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
                            <li className="flex items-center cursor-pointer" onClick={() => filterPosts('createdAt')}>
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
            {/* 게시물 목록 */}
            <div className="overflow-x-auto">
              <Link to="/postPage">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-4 py-3">팀 제목</th>
                      <th scope="col" className="px-4 py-3">내용</th>
                      <th scope="col" className="px-4 py-3">작성자</th>
                      <th scope="col" className="px-4 py-3">조회수</th>
                      <th scope="col" className="px-4 py-3">날짜</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* 현재 페이지의 게시물 렌더링 */}
                    {posts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage).map((post) => (
                      <tr key={post.id} className="border-b dark:border-gray-700">
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {post.teamField}
                        </td>
                        <td className="px-4 py-3">{post.content}</td>
                        <td className="px-4 py-3">{post.userId}</td>
                        <td className="px-4 py-3">{post.views}</td>
                        <td className="px-4 py-3">{post.createdAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Link>
            </div>
            {/* 페이지네이션 */}
            <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Showing <span className="font-semibold text-gray-900 dark:text-white">{indexOfFirstPost + 1}-{indexOfLastPost > dummyData.posts.length ? dummyData.posts.length : indexOfLastPost}</span> of <span className="font-semibold text-gray-900 dark:text-white">{dummyData.posts.length}</span>
              </span>
              <div className="flex items-center">
                {/* Previous Button */}
                <button onClick={prevPage} disabled={currentPage === 1} className="mr-2 px-3 py-1 rounded-md bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400 disabled:opacity-50">
                  &lt;
                </button>
                {/* 페이지 버튼 */}
                {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`mr-2 px-3 py-1 rounded-md bg-white text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 ${currentPage === number ? 'font-bold' : ''}`}
                  >
                    {number}
                  </button>
                ))}
                {/* Next Button */}
                <button onClick={nextPage} disabled={currentPage === totalPages} className="px-3 py-1 rounded-md bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400 disabled:opacity-50">
                  &gt;
                </button>
              </div>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
}

export default Board;
