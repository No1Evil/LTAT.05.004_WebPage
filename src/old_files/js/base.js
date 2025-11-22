function createDropdownElement() {
const accountContainer = document.getElementById('account');

  if (!accountContainer) {
    console.error('No #account element found');
    return;
  }

  // can change dynamically later
  const USERNAME = "Kasutaja"
  const EMAIL = "meil@meil.com"

  // Create dropdown HTML
  const dropdownHTML = `
    <div class="dropdown" id="dropdownMenu">
      <div class="dropdown-item">
        <strong>${USERNAME}</strong>
        <span>${EMAIL}</span>
      </div>
      <a href="login.html" class="logout">Logout</a>
    </div>
  `;

  // Inject it into the #account div
  accountContainer.insertAdjacentHTML('beforeend', dropdownHTML);

  // setup dropdown functionality
  const profilePhoto = document.getElementById('profilePhoto');
  const dropdownMenu = document.getElementById('dropdownMenu');

  if (profilePhoto && dropdownMenu) {
    // toggle open/close
    profilePhoto.addEventListener('click', () => {
      dropdownMenu.classList.toggle('active');
    });

    // tlose when clicking outside
    window.addEventListener('click', (event) => {
      if (!event.target.closest('#account')) {
        dropdownMenu.classList.remove('active');
      }
    });
  }
}

function init() {
  createDropdownElement();
}

document.addEventListener('DOMContentLoaded', () => {
    init();
});