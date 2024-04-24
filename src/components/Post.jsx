import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `http://192.168.240.43:8080/postpage/${id}`
        );
        const postData = await response.json();
        setPost(postData);

        // 게시글 데이터를 가져온 후 조회수 증가 요청을 보냄
        await fetch(`http://192.168.240.43:8080/api/posts/views?id=${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }), // 포스트 ID만을 전송
        });
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  // 포스트 데이터가 로드되지 않았을 경우
  if (!post) {
    return <div>Loading...</div>;
  }

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
  
  return (
    <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
      <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
        <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <header className="mb-4 lg:mb-6 not-format">
            <address className="flex items-center mb-6 not-italic">
              <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                <div className="text-xl font-bold text-gray-900 dark:text-white mr-3">
                  {post.nickname}
                </div>
                <p className="text-base text-gray-500 dark:text-gray-400">
                  {formatDate(post.createdate)}
                </p>
              </div>
            </address>
            <h1 className="mb-8 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
              {post.title}
            </h1>
          </header>
          <div className="mb-10">
            <p>{post.content}</p>
          </div>
          {/* 댓글 섹션 추가 */}
          <section className="not-format">
            {/* 댓글 내용 */}
            {post.comments &&
              post.comments.map((comment, index) => (
                <article
                  key={index}
                  className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900"
                >
                  {/* 내용 생략 */}
                </article>
              ))}
          </section>
        </article>
      </div>
    </main>
  );
}

export default Post;