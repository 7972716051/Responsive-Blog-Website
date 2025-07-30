function getBlogs() {
  return JSON.parse(localStorage.getItem('blogs') || '[]');
}

function saveBlogs(blogs) {
  localStorage.setItem('blogs', JSON.stringify(blogs));
}

function addBlog(e) {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const blogs = getBlogs();
  blogs.push({ id: Date.now(), title, content });
  saveBlogs(blogs);
  window.location.href = 'index.html';
}

function displayBlogs() {
  const blogs = getBlogs();
  const list = document.getElementById('blog-list');
  list.innerHTML = blogs.map(blog => `
    <div class="blog">
      <h2>${blog.title}</h2>
      <p>${blog.content.slice(0, 100)}...</p>
      <a href="view.html?id=${blog.id}">Read More</a>
      <a href="edit.html?id=${blog.id}">Edit</a>
    </div>
  `).join('');
}

function viewBlog() {
  const id = new URLSearchParams(window.location.search).get('id');
  const blog = getBlogs().find(b => b.id == id);
  const view = document.getElementById('blog-view');
  if (blog) {
    view.innerHTML = `<h2>${blog.title}</h2><p>${blog.content}</p>`;
  }
}

function loadEditForm() {
  const id = new URLSearchParams(window.location.search).get('id');
  const blog = getBlogs().find(b => b.id == id);
  document.getElementById('edit-title').value = blog.title;
  document.getElementById('edit-content').value = blog.content;
  document.getElementById('edit-blog-form').dataset.id = id;
}

function updateBlog(e) {
  e.preventDefault();
  const id = e.target.dataset.id;
  const blogs = getBlogs();
  const blog = blogs.find(b => b.id == id);
  blog.title = document.getElementById('edit-title').value;
  blog.content = document.getElementById('edit-content').value;
  saveBlogs(blogs);
  window.location.href = 'index.html';
}
