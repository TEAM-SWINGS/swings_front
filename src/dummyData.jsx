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
        { id: 1, userId: 1, boardId: 1, team: "Lotte Giants", title: "Post 1", content: "Content of post 1", views: 10, createdAt: "2024-04-11" },
        { id: 2, userId: 2, boardId: 2, team: "Doosan Bears", title: "Post 2", content: "Content of post 2", views: 15, createdAt: "2024-04-10" },
        { id: 3, userId: 3, boardId: 3, team: "NC Dinos", title: "Post 3", content: "Content of post 3", views: 20, createdAt: "2024-04-09" },
        { id: 4, userId: 4, boardId: 4, team: "Samsung Lions", title: "Post 4", content: "Content of post 4", views: 25, createdAt: "2024-04-08" },
        { id: 5, userId: 5, boardId: 5, team: "LG Twins", title: "Post 5", content: "Content of post 5", views: 30, createdAt: "2024-04-07" },
        { id: 6, userId: 6, boardId: 6, team: "Kia Tigers", title: "Post 6", content: "Content of post 6", views: 35, createdAt: "2024-04-06" },
        { id: 7, userId: 7, boardId: 7, team: "Kiwoom Heroes", title: "Post 7", content: "Content of post 7", views: 40, createdAt: "2024-04-05" },
        { id: 8, userId: 8, boardId: 8, team: "Hanwha Eagles", title: "Post 8", content: "Content of post 8", views: 45, createdAt: "2024-04-04" },
        { id: 9, userId: 9, boardId: 9, team: "SK Wyverns", title: "Post 9", content: "Content of post 9", views: 50, createdAt: "2024-04-03" },
        { id: 10, userId: 10, boardId: 10, team: "KT Wiz", title: "Post 10", content: "Content of post 10", views: 55, createdAt: "2024-04-02" },
        { id: 11, userId: 11, boardId: 11, team: "Team 11", title: "Post 11", content: "Content of post 11", views: 72, createdAt: "2024-04-11" },
        { id: 12, userId: 12, boardId: 12, team: "Team 12", title: "Post 12", content: "Content of post 12", views: 45, createdAt: "2024-04-11" },
        { id: 13, userId: 13, boardId: 13, team: "Team 13", title: "Post 13", content: "Content of post 13", views: 30, createdAt: "2024-04-11" },
        { id: 14, userId: 14, boardId: 14, team: "Team 14", title: "Post 14", content: "Content of post 14", views: 78, createdAt: "2024-04-11" },
        { id: 15, userId: 15, boardId: 15, team: "Team 15", title: "Post 15", content: "Content of post 15", views: 87, createdAt: "2024-04-11" },
        { id: 16, userId: 16, boardId: 16, team: "Team 16", title: "Post 16", content: "Content of post 16", views: 52, createdAt: "2024-04-11" },
        { id: 17, userId: 17, boardId: 17, team: "Team 17", title: "Post 17", content: "Content of post 17", views: 63, createdAt: "2024-04-11" },
        { id: 18, userId: 18, boardId: 18, team: "Team 18", title: "Post 18", content: "Content of post 18", views: 41, createdAt: "2024-04-11" },
        { id: 19, userId: 19, boardId: 19, team: "Team 19", title: "Post 19", content: "Content of post 19", views: 33, createdAt: "2024-04-11" },
        { id: 20, userId: 20, boardId: 20, team: "Team 20", title: "Post 20", content: "Content of post 20", views: 67, createdAt: "2024-04-11" },
        { id: 21, userId: 21, boardId: 21, team: "Team 21", title: "Post 21", content: "Content of post 21", views: 98, createdAt: "2024-04-11" },
        { id: 22, userId: 22, boardId: 22, team: "Team 22", title: "Post 22", content: "Content of post 22", views: 77, createdAt: "2024-04-11" },
        { id: 23, userId: 23, boardId: 23, team: "Team 23", title: "Post 23", content: "Content of post 23", views: 85, createdAt: "2024-04-11" },
        { id: 24, userId: 24, boardId: 24, team: "Team 24", title: "Post 24", content: "Content of post 24", views: 92, createdAt: "2024-04-11" },
        { id: 25, userId: 25, boardId: 25, team: "Team 25", title: "Post 25", content: "Content of post 25", views: 60, createdAt: "2024-04-11" },
        { id: 26, userId: 26, boardId: 26, team: "Team 26", title: "Post 26", content: "Content of post 26", views: 38, createdAt: "2024-04-11" },
        { id: 27, userId: 27, boardId: 27, team: "Team 27", title: "Post 27", content: "Content of post 27", views: 79, createdAt: "2024-04-11" },
        { id: 28, userId: 28, boardId: 28, team: "Team 28", title: "Post 28", content: "Content of post 28", views: 49, createdAt: "2024-04-11" },
        { id: 29, userId: 29, boardId: 29, team: "Team 29", title: "Post 29", content: "Content of post 29", views: 57, createdAt: "2024-04-11" },
        { id: 30, userId: 30, boardId: 30, team: "Team 30", title: "Post 30", content: "Content of post 30", views: 65, createdAt: "2024-04-11" }
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
  