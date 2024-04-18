import Header from "../components/Header";
import Footer from "../components/Footer";
import Board from "../components/Board";
import React, { useState } from "react";

function MainPage() {
  const [selectedTeam, setSelectedTeam] = useState(""); // 선택된 팀 상태

  // 선택된 팀을 업데이트하는 함수
  const handleSelectTeam = (team) => {
    setSelectedTeam(team);
  };

  return (
    <>
      <Header onSelectTeam={handleSelectTeam}  />
      <Board selectedTeam={selectedTeam} />
      <Footer />
    </>
  );
}

export default MainPage;