import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ChangePwd() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/user/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: currentPassword,
          newPassword: newPassword,
          userId: localStorage.getItem("id"),
        }),
      });
  
      if (response.ok) {
        alert('비밀번호가 변경되었습니다.');
        navigate('/');
      } else {
        const errorMessage = await response.text();
        alert(errorMessage);
      }
      
    } catch (error) {
      console.error('비밀번호 변경 요청 중 오류 발생:', error);
      alert('비밀번호 변경 중 오류가 발생했습니다.');
    }
  };
  

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link to='/' className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="h-8 mr-2" src="https://swings.s3.ap-northeast-2.amazonaws.com/title_swings.png" alt="title" />
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                비밀번호 변경
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleChangePassword}>
                <div>
                  <label htmlFor="currentPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">현재 비밀번호</label>
                  <input type="password" name="currentPassword" id="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div>
                  <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">새 비밀번호</label>
                  <input type="password" name="newPassword" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <button type="submit" className="w-full flex items-center justify-center py-2 px-5 text-sm font-medium text-gray-900 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                  비밀번호 변경 하기
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ChangePwd;
