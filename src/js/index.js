/**
 * Self-Explanatory :)
 * @param {object} postData - post data
 * @param {string} postData.author - Autor name
 * @param {string} postData.text - Main text of the post
 * @param {string} postData.date - Publication date
 * @param {string} [postData.imageSrc] - Image URL (optional)
 * @param {string} [postData.avatarSrc] - Avatar URL (optional, default '../images/me.png').
 */ 
function createPostElement(postData) {
    const postList = document.getElementById('postList');

    if (!postList) {
        console.error("No #postList");
        return;
    }

    // Default values for optional parameters
    const {
        author,
        text,
        date,
        imageSrc = '',
        avatarSrc = '../images/me.png',
        likes = '0'
    } = postData;

    const imageHTML = imageSrc 
        ? `<img src="${imageSrc}" alt="Post Image" class="post-image">` 
        : '';

    const newPostHTML = `
        <article class="post-card">
            <div class="post-header">
                <img src="${avatarSrc}" alt="User Avatar" class="post-avatar">
                <div class="post-info">
                    <h4 class="post-author">${author}</h4>
                </div>
            <span class="post-date">${date}</span> 
            </div>
            <div class="post-content">
                <p>
                    ${text}
                </p>
                ${imageHTML}
            </div>
            <div class="post-actions">
                <span>${likes} 👍</span>
            </div>
        </article>
    `;

    postList.insertAdjacentHTML('afterbegin', newPostHTML);
}-

document.addEventListener('DOMContentLoaded', () => {
    // 1. Create a few test posts
    createPostElement({
        author: "User",
        text: "Am blue",
        date: "Oct 6, 2025",
        imageSrc: "../images/test_post.png",
    });

    createPostElement({
        author: "Dumb user",
        text: "Let me cook",
        date: "Oct 5, 2025",
        avatarSrc: "../images/chinwoo_avatar.png"
    });
    
    createPostElement({
        author: "Admin",
        text: "Never post shit again",
        date: "Oct 4, 2025",
        likes: "200069"
    });

    createPostElement({
        author: "Dbqbwqheqetqdbqru",
        text: "hey guys",
        date: "Oct 4, 2025",
        likes: "1"
    });

    createPostElement({
        author: "Wdiqjqidqtudqh",
        text: "heyo",
        date: "Oct 4, 2025",
    });
});

// dropdown menu
const profilePhoto = document.getElementById('profilePhoto');
const dropdownMenu = document.getElementById('dropdownMenu');

// toggle dropdown when clicking the profile photo
profilePhoto.addEventListener('click', () => {
  dropdownMenu.classList.toggle('active');
});

// close dropdown when clicking outside
 window.addEventListener('click', (event) => {
    if (!event.target.closest('#account')) {
        dropdownMenu.classList.remove('active');
    }
});