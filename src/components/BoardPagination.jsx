// import React, { useState, useEffect } from "react";

// function BoardPagination({ currentPage, totalPages }) {

//   // 이전 페이지로 이동
//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   // 다음 페이지로 이동
//   const nextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   // 페이지 변경 시 게시글 불러오기
//   useEffect(() => {
//     // 선택된 구단이 있을 경우 해당 구단의 게시글을 불러옴
//     if (selectedTeam) {
//       handleSelectTeam(selectedTeam);
//     } else {
//       fetchPosts();
//     }
//   }, [currentPage, selectedTeam]);
  
//   const handleToggleNav = () => {
//     setIsNavOpen(!isNavOpen);
//   };

//   // 시작 페이지와 끝 페이지 계산 (수정된 부분)
//   const pagesPerPage = 10; // 한 번에 보이는 페이지 수
//   const lastPage = Math.ceil(posts.length / postsPerPage);
//   const startPage = Math.floor((currentPage - 1) / pagesPerPage) * pagesPerPage + 1;
//   const endPage = Math.min(startPage + pagesPerPage - 1, totalPages);


//   return (
//     <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
//       <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
//         Showing
//         <span className="font-semibold text-gray-900 dark:text-white">{(currentPage - 1) * postsPerPage + 1}-{Math.min(currentPage * postsPerPage, posts.length)}</span>
//         of
//         <span className="font-semibold text-gray-900 dark:text-white">{totalPages}</span>
//       </span>
//       <ul className="inline-flex items-stretch -space-x-px">
//         <li>
//           <button
//             onClick={prevPage}
//             disabled={currentPage === 1}
//             className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//           >
//             <span className="sr-only">Previous</span>
//             <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//               <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
//             </svg>
//           </button>
//         </li>
//         {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
//           <li key={startPage + index}>
//             <button
//               onClick={() => setCurrentPage(startPage + index)}
//               className={`flex items-center justify-center text-sm py-2 px-3 leading-tight ${
//                 startPage + index === currentPage
//                   ? "text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
//                   : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//               }`}
//             >
//               {startPage + index}
//             </button>
//           </li>
//         ))}
//         <li>
//           <button
//             onClick={nextPage}
//             disabled={currentPage === totalPages}
//             className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//           >
//             <span className="sr-only">Next</span>
//             <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//               <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293-3.293a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//             </svg>
//           </button>
//         </li>
//       </ul>
//     </div>
//   );
// }

// export default BoardPagination;
