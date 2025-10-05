function addSamplePost() {
    const postList = document.getElementById('postList');

    if (!postList) {
        console.error("Контейнер #postList не найден.");
        return;
    }

    // Test post
    const newPostHTML = `
        <article class="post-card">
            <div class="post-header">
                <img src="../images/me.png" alt="User Avatar" class="post-avatar">
                <div class="post-info">
                    <h4 class="post-author">User</h4>
                </div>
            <span class="post-date">Oct 5, 2025</span> 
            </div>
            <div class="post-content">
                <p>
                    Am blue
                </p>
                <img src="../images/test_post.png" alt="Post Image" class="post-image">
            </div>
            <div class="post-actions">
                <span>👍 (#TODO)</span>
            </div>
        </article>
    `;

    postList.insertAdjacentHTML('afterbegin', newPostHTML);
}

function addTestPostNoImg() {
    const postList = document.getElementById('postList');

    if (!postList) {
        console.error("Контейнер #postList не найден.");
        return;
    }

    // Test post
    const newPostHTML = `
        <article class="post-card">
            <div class="post-header">
                <img src="../images/me.png" alt="User Avatar" class="post-avatar">
                <div class="post-info">
                    <h4 class="post-author">Dumb user</h4>
                </div>
            <span class="post-date">Oct 5, 2025</span> 
            </div>
            <div class="post-content">
                <p>
                    Let me cook
                </p>
            </div>
            <div class="post-actions">
                <span>👍 (#TODO)</span>
            </div>
        </article>
    `;

    postList.insertAdjacentHTML('afterbegin', newPostHTML);
}

document.addEventListener('DOMContentLoaded', addTestPostNoImg);
document.addEventListener('DOMContentLoaded', addSamplePost);