/**
 * Self-Explanatory :)
 * @param {object} postData - post data
 * @param {string} postData.title - Post title
 * @param {string} postData.username - Autor name
 * @param {string} postData.content - Main text of the post
 * @param {string} postData.created_at - Publication date
 * @param {string} [postData.images] - Image URLs (optional)
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
        username,
        title,
        content,
        created_at,
        images = [],
        avatarSrc = '../images/me.png',
        likes = '0'
    } = postData;

    const imageHTML = images.length > 0 
        ? images.map(img => 
            `<img src="${img.url}" alt="${img.name}" class="post-image">`
          ).join('') 
        : '';

    const newPostHTML = `
        <article class="post-card">
            <div class="post-header">
                <img src="${avatarSrc}" alt="User Avatar" class="post-avatar">
                <div class="post-info">
                    <h4 class="post-author">${username}</h4>
                </div>
            <span class="post-date">${created_at}</span> 
            </div>
            <div class="post-content">
                <h4>
                    ${title}
                </h4>
                <p>
                    ${content}
                </p>
                ${imageHTML}
            </div>
            <div class="post-actions">
                <span>${likes} 👍</span>
            </div>
        </article>
    `;

    postList.insertAdjacentHTML('afterbegin', newPostHTML);
}

// NO PROBLEM, TAKE THAT! :))
const MASTER_KEY = "$2a$10$JUOR5w/jlcQRAY95xO0X/OQfA/VgAARVfmgMwN/fVlQffXnPqpS5y";
/**
 * Fetch data from a given URL and return it as JSON.
 * @param {*} url - URL to fetch data from
 * @returns JSON object
 */
async function getData(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-Master-Key': MASTER_KEY,
                
                'X-Bin-Meta': 'false' 
            }
        });

        const result = await response.json();
        console.log("Fetched data:", result);
        
        return result; 

    } catch (error) {
        console.error("Error fetching data:", error.message);
        return null; 
    }
}

const BIN_ID = "690651bfd0ea881f40cc6adb";
const URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

async function init() {
    //Fetch posts from remote JSON bin
    //const localPostsArray = await getData(URL);
    const localPostsArray = await getData('../tempDatabase/posts.json')

    if (Array.isArray(localPostsArray)) {
        for (const postData of localPostsArray) {
            createPostElement(postData);
        }
    } else {
        console.error("Failed to retrieve or process post data.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    init();
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