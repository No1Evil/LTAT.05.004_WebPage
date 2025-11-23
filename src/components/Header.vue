<template>
  <header>
    <div class="header">
        <h2> Forum </h2>
    </div>
    <div id="navigation">
      <nav>
        <ul>
          <li><router-link to="/"> Home </router-link></li>
          <li><router-link to="/signup"> Signup </router-link></li>
        </ul>
      </nav>
    </div>
    
    <div id="account"> 
      <img 
        src="../images/me.png" 
        alt="account picture" 
        class="profile-photo"
        @click="toggleDropdown" 
      >
      
      <div class="dropdown" :class="{ active: isDropdownOpen }">
        <div class="dropdown-item"> Profile </div>
        <a href="#" class="logout" @click="LogOut"> Log out </a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'; // reaktiivsed muutujad
import { useRouter } from 'vue-router';

const isDropdownOpen = ref(false); // ref teeb muutuja, mida vue jälgib

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// Log Out nupp -> sign up page
const router = useRouter();
const LogOut = () => {
  router.push('/signup'); 
};

</script>

<style scoped>
header {
  width: 100%;
  background-color: rgba(0,0,0,0.2);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border-radius: 30px;
}

/* --- Navigation Styles --- */
#navigation nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

#navigation nav ul li {
  margin-right: 20px;
}

/* Router link styling */
#navigation nav ul li a {
  text-decoration: none;
  color: black;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

/* Vue Router active link style */
#navigation nav ul li .router-link-active,
#navigation nav ul li a:hover {
  background-color: rgba(0,0,0,0.3);
}

/* --- Account Styles --- */
#account {
  position: relative;
  display: inline-block;
  margin: 0;
}

.profile-photo {
  width: 40px;
  height: 40px;
  border-radius: 75%;
  cursor: pointer;
  border: 2px solid #ccc;
  transition: border-color 0.2s ease;
}

.profile-photo:hover {
  border-color: #4a90e2;
}

/* --- Dropdown Styles --- */
.dropdown {
  display: none; /* Hidden by default */
  position: absolute;
  right: 0;
  top: 60px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 200px;
  z-index: 100;
}

.dropdown.active {
  display: block; /* Shown when isDropdownOpen is true */
}

/* Add basic styling for the new dropdown content */
.dropdown-item {
    padding: 12px 15px;
    border-bottom: 1px solid #eee;
}
.logout {
    display: block;
    padding: 12px 15px;
    text-align: center;
    color: #e74c3c;
    text-decoration: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0 0 8px 8px;
}

.logout:hover {
    background-color: #fcebea;
}

/* --- Media Queries --- */
@media (max-width: 768px) {
  header {
    padding: 10px;
  }
  #navigation nav ul {
    justify-content: center;
    flex-grow: 1;
  }
}
</style>