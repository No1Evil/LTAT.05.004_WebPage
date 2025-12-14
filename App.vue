<template>
  <div id="app-container">
    <Header :is-authenticated="isAuthenticated" @logout="Logout" /> 
    
    <main id="mainBody"> 
      <router-view /> 
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

const isAuthenticated = ref(false);

const checkAuthStatus = async () => {
    try {
        const response = await fetch("http://localhost:3000/auth/authenticate", {
            credentials: 'include',
        });
        const data = await response.json();
        isAuthenticated.value = data.authenticated;
        console.log("Auth Status Checked:", isAuthenticated.value);
    } catch (e) {
        console.error("Authentication check failed:", e);
        isAuthenticated.value = false;
    }
};

const Logout = () => {
    fetch("http://localhost:3000/auth/logout", {
        credentials: 'include',
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        console.log('logged out, jwt deleted');
    })
    .catch((e) => {
        console.log(e);
        console.log("error login");
    });
};

const Login = () => {
    fetch("http://localhost:3000/auth/login", {
        credentials: 'include',
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        console.log('logged in, jwt created');
    })
    .catch((e) => {
        console.log(e);
        console.log("error login");
    });
};

// When component is mounted will call async func
onMounted(async () => {
    await checkAuthStatus();
});

</script>

<style>
#app-container { 
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
#mainBody {
  flex-grow: 1;
}
</style>