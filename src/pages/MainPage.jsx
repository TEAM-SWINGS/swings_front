import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BoardHeader from "../components/BoardHeader";
import Board from "../components/Board";
import BoardPagination from "../components/BoardPagination";
import useUrlParams from "../shared/utils/useUrlParams";
import { useSearchParams } from "react-router-dom";

const size = 10;
function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
  const page = searchParams.get('page') || '1';
  const sort = searchParams.get('sort') || 'createdate';
  const team = searchParams.get('team') || '';


  const [posts, setPosts] = useState([]);
  
   // 페이지 및 사이즈를 기반으로 게시물 가져오기
  const fetchPosts = async () => {
    let baseUrl = 'http://localhost:8080';
    const paramsObj = {
      page,
      size,
      sort,
      team
    }
    const urlParams = new URLSearchParams(paramsObj);
    const fetchUrl = `${baseUrl}/api/posts?${urlParams.toString()}`;
    try {
      const response = await fetch(fetchUrl);
      if (response.ok) {
        const data = await response.json();
        setPosts(data.content);
        setTotalPosts(data.totalElements);
        setTotalPages(data.totalPages);
      } else {
        throw new Error("게시글을 가져오는 데 실패했습니다.");
      }
    } catch (error) {
      console.error("게시글을 가져오는 중 오류가 발생했습니다:", error);
      // 오류 처리
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [searchParams]);



  return (
    <>
      <Header />
      <Board posts={posts} totalPages={totalPages} totalPosts={totalPosts} refetch={fetchPosts} />
      <Footer />
    </>
  );
}

export default MainPage;
