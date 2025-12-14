<template>
  <div id="app-container">
    <Header @logout="Logout" /> 
    
    <main id="mainBody"> 
      <router-view /> 
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';


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