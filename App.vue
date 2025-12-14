<template>
  <div id="app-container">
    <template v-if="isAuthStatusLoaded">
        <Header @logout="Logout" />
        
        <main id="mainBody"> 
            <router-view /> 
        </main>

        <Footer />
    </template>
    <div v-else>
        Authenticating...
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

const store = useStore();

const isAuthenticated = computed(() => store.getters.isAuthenticated);
const isAuthStatusLoaded = computed(() => store.getters.isAuthStatusLoaded);

const Logout = () => {
    store.dispatch('logout');
};

onMounted(() => {
    store.dispatch('checkAuthStatus');
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