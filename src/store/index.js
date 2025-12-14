import { createStore } from 'vuex'

export default createStore({
  state: {
    isAuthenticated: false,
    authStatusLoaded: false,
  },

  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    isAuthStatusLoaded: (state) => state.authStatusLoaded,
  },

  mutations: {
    SET_AUTH_STATUS(state, status) {
      state.isAuthenticated = status;
    },
    SET_AUTH_LOADED(state, loaded) {
      state.authStatusLoaded = loaded;
    },
  },

  actions: {
    async checkAuthStatus({ commit }) {
      // 1. Reset the loaded state at the start
      commit('SET_AUTH_LOADED', false);
      
      try {
        const response = await fetch("http://localhost:3000/auth/authenticate", {
          credentials: 'include',
        });
        const data = await response.json();
        
        const newStatus = data.authenticated;
        commit('SET_AUTH_STATUS', newStatus);

        console.log("Auth Status Checked via Store:", newStatus);

      } catch (e) {
        console.error("Authentication check failed via Store:", e);
        commit('SET_AUTH_STATUS', false);
      } finally {
        commit('SET_AUTH_LOADED', true);
      }
    },
    async logout({ commit }) {
    try {
      // Call backend to clear cookie
      await fetch("http://localhost:3000/auth/logout", {
        credentials: 'include',
      });
    } catch (e) {
      console.error("Logout request failed:", e);
    } finally {
      commit('SET_AUTH_STATUS', false);
      commit('SET_AUTH_LOADED', true);
    }
  },
  async login({ commit }) {
    commit('SET_AUTH_STATUS', true);
    commit('SET_AUTH_LOADED', true);
  }
    
  },

  
  modules: {
  }
})