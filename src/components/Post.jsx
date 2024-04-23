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
  return (
    <>
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header className="mb-4 lg:mb-6 not-format">
              <address className="flex items-center mb-6 not-italic">
                <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                  <a
                    href="#"
                    rel="author"
                    className="text-xl font-bold text-gray-900 dark:text-white mr-3"
                  >
                    {post.nickname}
                  </a>
                  <p className="text-base text-gray-500 dark:text-gray-400">
                    <time
                      pubdate
                      dateTime={post.createdate}
                      title={post.createdate}
                    >
                      {post.createdate}
                    </time>
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
    </>
  );
}

export default Post;