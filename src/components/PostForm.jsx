import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

function PostForm({userID }) {
  const navigate = useNavigate();
  const editorRef = useRef();

  const [formData, setFormData] = useState({
    teamfield: '',
    title: '',
    content: '',
  });

  const handleSubmit = async(event) => {
    event.preventDefault();
    
    const editorInstance = editorRef.current.getInstance();
    const markdownContent = editorInstance.getMarkdown();
    
    try {
      const response = await fetch("http://localhost:8080/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          content: markdownContent,
          teamfield: formData.teamfield,
          email: localStorage.getItem("email"),
        }),
      });

      if (response.ok) {
        // console.log("Post created successfully!");
        navigate("/");
      } else {
        console.error("Failed to create post.");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const options = {
    toolbarItems: [
      ["heading", "bold", "italic", "strike"],
      ["hr", "quote"],
      ["ul", "ol", "task", "indent", "outdent"],
      ["table", "image", "link"],
      ["code", "codeblock"],
      ["scrollSync"],
    ],
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          글 쓰기
        </h2>
        <form action="http://localhost:8080/postformpage" method="post" className="space-y-8" onSubmit={handleSubmit}>
          <div>
            <select
              id="teamfield"
              name="teamfield"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              required
              value={formData.teamfield}
              onChange={handleInputChange}
            >
              <option value="" disabled selected>
                구단을 선택하세요
              </option>
              <option value="KIA 타이거즈">KIA 타이거즈</option>
              <option value="두산 베어스">두산 베어스</option>
              <option value="롯데 자이언츠">롯데 자이언츠</option>
              <option value="삼성 라이온즈">삼성 라이온즈</option>
              <option value="한화 이글스">한화 이글스</option>
              <option value="NC 다이노스">NC 다이노스</option>
              <option value="키움 히어로즈">키움 히어로즈</option>
              <option value="KT 위즈">KT 위즈</option>
              <option value="LG 트윈스">LG 트윈스</option>
              <option value="SSG 랜더스">SSG 랜더스</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              id="title"
              name="title"
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="제목을 입력하세요"
              required
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="sm:col-span-2">
            <Editor
              ref={editorRef}
              placeholder="내용을 입력하세요"
              previewStyle="vertical"
              height="auto"
              initialValue=""
              initialEditType="markdown"
              hideModeSwitch={true}
              language="ko-KR"
              useCommandShortcut={true}
              options={options}
              onFocus={() => {
                const editorInstance = editorRef.current.getInstance();
                editorInstance.setMarkdown("");
              }}
              onChange={() => {
                const editorInstance = editorRef.current.getInstance();
                const markdownContent = editorInstance.getMarkdown();
                setFormData({ ...formData, content: markdownContent });
              }}
            />
          </div>
          <div className="inline-block">
            <button
              className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              type="submit"
            >
              작성하기
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default PostForm;
