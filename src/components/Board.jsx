import React, { useState, useEffect } from "react"; // useMemo를 사용하지 않으므로 제거
import { Link, useSearchParams, useNavigate } from "react-router-dom";

function Board() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
  const postsPerPage = 10; // 페이지 당 게시물 수
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedTeam, setSelectedTeam] = useState(""); // 선택된 구단 상태
  const [storedUserId, setStoredUserId] = useState(""); // 저장된 사용자 ID

  const changeUrlParams = (key, value) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(key, value);
    setSearchParams(newSearchParams);
  };
  
  // 로그인 상태 확인
  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(storedLoggedIn === 'true');

    // 로그인된 경우에만 storedUserId 설정
    if (storedLoggedIn === 'true') {
      const storedUserId = localStorage.getItem('id');
      setStoredUserId(storedUserId);
    }
  }, []);

  // 게시글 드롭다운 토글
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // 페이지 및 사이즈를 기반으로 게시물 가져오기
  const fetchPostsByParams = async (url) => {
    try {
      const response = await fetch(url);
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

  // 서버에서 현재 페이지에 해당하는 게시물 가져오기
  const fetchPosts = async () => {
    let url;
    if (selectedTeam) {
      url = `http://192.168.240.43:8080/api/posts?page=${currentPage - 1}&size=${postsPerPage}&team=${selectedTeam}`;
    } else {
      url = `http://192.168.240.43:8080/api/posts?page=${currentPage - 1}&size=${postsPerPage}`;
    }
    await fetchPostsByParams(url);
  };


  // 전체 보기 핸들러
  const handleSelectAll = async () => {
    setSelectedTeam(""); // 선택된 구단 초기화
    await fetchPostsByParams(`http://192.168.240.43:8080/api/posts`);
  };

  // 팀 선택 핸들러 수정
  const handleSelectTeam = async (team) => {
    setSelectedTeam(team);
    await fetchPostsByParams(`http://192.168.240.43:8080/api/posts?team=${team}`);
  };

  // 초기 렌더링 시 게시물 가져오기
  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

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

  // 페이지 변경 시 게시글 불러오기
  useEffect(() => {
    // 선택된 구단이 있을 경우 해당 구단의 게시글을 불러옴
    if (selectedTeam) {
      handleSelectTeam(selectedTeam);
    } else {
      fetchPosts();
    }
  }, [currentPage, selectedTeam]);
  
  const handleToggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  // 게시글 필터링 함수 (수정된 부분)
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

  // 날짜 형식 바꾸기 (수정된 부분)
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

  // 게시글 수정
  const handleEdit = (postId) => {
    navigate(`/edit/${postId}`);
  };

  // 게시글 삭제
  const handleDelete = async (postId, postUserId) => {
    if (window.confirm("게시물을 삭제하시겠습니까?")) {
      try {
        // 로컬 스토리지에서 저장된 사용자 ID와 토큰 가져오기
        const storedUserId = localStorage.getItem('id');
        const token = localStorage.getItem('token');

        // 저장된 사용자 ID와 게시물의 작성자 ID 비교
        if (storedUserId == postUserId) {
          const response = await fetch(`http://192.168.240.43:8080/api/posts/${postId}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}` // 토큰을 Authorization 헤더에 포함
            }
          });

          if (response.ok) { // 게시물 삭제 성공 시 새로고침 또는 필요한 처리
            alert("게시물이 삭제되었습니다."); 
            await fetchPosts(); // 게시물 목록 다시 불러오기
            window.location.reload();
          } else {
            throw new Error("게시물 삭제에 실패했습니다.");
          }
        } else {
          throw new Error("로그인한 사용자의 게시물이 아닙니다.");
        }
      } catch (error) {
        console.error("게시물 삭제 중 오류가 발생했습니다:", error); // 오류 처리
        alert("게시물 삭제에 실패했습니다.");
      }
    }
  };

  // 시작 페이지와 끝 페이지 계산 (수정된 부분)
  const pagesPerPage = 10; // 한 번에 보이는 페이지 수
  const lastPage = Math.ceil(posts.length / postsPerPage);
  const startPage = Math.floor((currentPage - 1) / pagesPerPage) * pagesPerPage + 1;
  const endPage = Math.min(startPage + pagesPerPage - 1, totalPages);

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
                    <th scope="col" className="px-4 py-3 text-center"></th>
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

                      {/* 로그인된 id와 게시글의 userid가 같으면 수정/삭제 가능 */}
                      {storedUserId == post.userId && ( 
                        <td className="px-2 py-1 text-center">
                          <button 
                            onClick={() => handleEdit(post.id)}
                            className="mr-1 inline-flex items-center justify-center px-2 py-1 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                          >
                            수정
                          </button>
                          <button 
                            onClick={() => handleDelete(post.id, post.userId)}
                            className="mr-1 inline-flex items-center justify-center px-2 py-1 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                          >
                            삭제
                          </button>
                        </td>
                      )} 
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
