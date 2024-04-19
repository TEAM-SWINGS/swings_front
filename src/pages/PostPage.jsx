// PostPage.js
import Header from "../components/Header";
import Footer from "../components/Footer";
import Post from "../components/Post";
import { useParams } from "react-router-dom";

function PostPage() {
  // useParams를 사용하여 URL에서 postId 가져오기
  const { id } = useParams();

  return (
    <>
      <Header />
      <Post postId={id} />
      <Footer />
    </>
  );
}

export default PostPage;
