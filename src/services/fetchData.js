const fetch = require("node-fetch");

async function fetchUsers() {
  const users = await fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json());
  for (const user of users) {
    user.posts = await fetchPosts(user.id);
  }
  return users;
}

async function fetchPosts(userId) {
  const posts = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`).then(res => res.json());
  for (const post of posts) {
    post.comments = await fetchComments(post.id);
  }
  return posts;
}

async function fetchComments(postId) {
  return fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`).then(res => res.json());
}

module.exports = { fetchUsers };
