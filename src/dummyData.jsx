const kboTeams = ["KIA 타이거즈", "두산 베어스", "롯데 자이언츠", "삼성 라이온즈", "한화 이글스", "NC 다이노스", "키움 히어로즈", "KT 위즈", "LG 트윈스", "SSG 랜더스"];
const dummyData = {
    users: [
      { id: 1, email: "user1@example.com", password: "password1", nickname: "user1" },
      { id: 2, email: "user2@example.com", password: "password2", nickname: "user2" },
      { id: 3, email: "user3@example.com", password: "password3", nickname: "user3" },
      { id: 4, email: "user4@example.com", password: "password4", nickname: "user4" },
      { id: 5, email: "user5@example.com", password: "password5", nickname: "user5" },
      { id: 6, email: "user6@example.com", password: "password6", nickname: "user6" },
      { id: 7, email: "user7@example.com", password: "password7", nickname: "user7" },
      { id: 8, email: "user8@example.com", password: "password8", nickname: "user8" },
      { id: 9, email: "user9@example.com", password: "password9", nickname: "user9" },
      { id: 10, email: "user10@example.com", password: "password10", nickname: "user10" }
    ],
    boards: [
      { id: 1, userId: 1, title: "Board 1" },
      { id: 2, userId: 2, title: "Board 2" },
      { id: 3, userId: 3, title: "Board 3" },
      { id: 4, userId: 4, title: "Board 4" },
      { id: 5, userId: 5, title: "Board 5" },
      { id: 6, userId: 6, title: "Board 6" },
      { id: 7, userId: 7, title: "Board 7" },
      { id: 8, userId: 8, title: "Board 8" },
      { id: 9, userId: 9, title: "Board 9" },
      { id: 10, userId: 10, title: "Board 10" }
    ],
    posts: [
      ...Array.from({ length: 120 }, (_, index) => ({
        id: index + 1,
        userId: "User " + (index + 1),
        boardId: (index % 10) + 1,
        team: kboTeams[Math.floor(Math.random() * kboTeams.length)],
        title: "Post " + (index + 1),
        content: "Content of post " + (index + 1),
        views: Math.floor(Math.random() * 100),
        createdAt: "2024-04-" + ((index % 30) + 1).toString().padStart(2, "0")
      }))
    ],
    comments: [
      { id: 1, userId: 1, postId: 1, content: "Comment 1 on post 1", createdAt: "2024-04-11" },
      { id: 2, userId: 2, postId: 2, content: "Comment 2 on post 2", createdAt: "2024-04-10" },
      { id: 3, userId: 3, postId: 3, content: "Comment 3 on post 3", createdAt: "2024-04-09" },
      { id: 4, userId: 4, postId: 4, content: "Comment 4 on post 4", createdAt: "2024-04-08" },
      { id: 5, userId: 5, postId: 5, content: "Comment 5 on post 5", createdAt: "2024-04-07" },
      { id: 6, userId: 6, postId: 6, content: "Comment 6 on post 6", createdAt: "2024-04-06" },
      { id: 7, userId: 7, postId: 7, content: "Comment 7 on post 7", createdAt: "2024-04-05" },
      { id: 8, userId: 8, postId: 8, content: "Comment 8 on post 8", createdAt: "2024-04-04" },
      { id: 9, userId: 9, postId: 9, content: "Comment 9 on post 9", createdAt: "2024-04-03" },
      { id: 10, userId: 10, postId: 10, content: "Comment 10 on post 10", createdAt: "2024-04-02" }
    ]
  };
  
  export default dummyData;
  