import React, { useState, useEffect } from "react"; // useMemo를 사용하지 않으므로 제거
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import useUrlParams from "../shared/utils/useUrlParams";
import BoardPagination from "./BoardPagination";
import BoardHeader from "./BoardHeader";

function Board({posts, totalPages, totalPosts, refetch}) {
  const { searchParams, changeUrlParams } = useUrlParams();
  const currentPage = searchParams.get('page') || '1';
  const pageSize = 10;
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [storedUserId, setStoredUserId] = useState(""); // 저장된 사용자 ID

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
            await refetch(); // 게시물 목록 다시 불러오기
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

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <BoardHeader isLoggedIn={isLoggedIn}/>
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
          <BoardPagination  posts={posts} totalPages={totalPages} totalPosts={totalPosts} />
        </div>
      </div>
    </section>
  );
}

export default Board;