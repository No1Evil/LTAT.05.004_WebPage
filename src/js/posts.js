// Maybe http post request? But then we should use auth tokens 0.0
function createPost(user, title, content){
    const postListContainer = document.getElementById('postList')

    if (!postListContainer){
        // Debug. For removal
        console.error("Error postList container not found")
        return
    }


    if (!user){
        // Check if user is logged in
        return
    }

    // TODO
}

// On clicking newPostForm create post
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('newPostForm')
    if (form){

    } else {
        // Debug. For removal
        console.error("Error newPostForm container not found")
        return
    }

    // TODO
})

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
