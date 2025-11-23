<template>
  <div id="app-container">
    <Header /> 
    
    <main id="mainBody"> 
      <router-view /> 
    </main>

    <Footer />
  </div>
</template>

<script setup>
  import Header from '@/components/Header.vue';
  import Footer from '@/components/Footer.vue';
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