import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BoardHeader from "../components/BoardHeader";
import Board from "../components/Board";
import BoardPagination from "../components/BoardPagination";

function MainPage() {
  // MainPage 컴포넌트의 상태
  // const [currentPage, setCurrentPage] = useState(1);
  // const [selectedTeam, setSelectedTeam] = useState("");

  // // Board 컴포넌트에서 페이지 변경 시 호출할 함수
  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };

  // // BoardHeader 컴포넌트에서 팀 선택 시 호출할 함수
  // const handleTeamSelect = (team) => {
  //   setSelectedTeam(team);
  // };

  return (
    <>
      <Header />
      {/* <BoardHeader currentPage={currentPage} selectedTeam={selectedTeam} handleTeamSelect={handleTeamSelect} /> */}
      {/* <Board currentPage={currentPage} handlePageChange={handlePageChange} selectedTeam={selectedTeam} /> */}
      {/* <BoardPagination currentPage={currentPage} handlePageChange={handlePageChange} /> */}
      <Board />
      <Footer />
    </>
  );
}

export default MainPage;
