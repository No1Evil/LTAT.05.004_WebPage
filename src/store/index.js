import { createStore } from 'vuex'

export default createStore({
  state: {
    isAuthenticated: false,
    user: null,
  },
  getters: {
    isLoggedIn: state => state.isAuthenticated,
  },
  mutations: {
    SET_AUTHENTICATED(state, status) {
      state.isAuthenticated = status;
    },
    SET_USER(state, user) {
      state.user = user;
    }
  },
  actions: {
    async login({ commit }, payload) {
      try {
        const response = await fetch("http://localhost:3000/auth/login", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload), // payload contains {email, password}
          credentials: 'include',
        });
        
        const data = await response.json();

        if (response.ok) {
          // 1. Update the frontend state to TRUE
          commit('SET_AUTHENTICATED', true);
          // 2. Optionally store user info (e.g., user_id from your backend response)
          commit('SET_USER', { id: data.user_id }); 
          return true; // Indicate success
        } else {
          // Login failed
          commit('SET_AUTHENTICATED', false);
          throw new Error(data.error || 'Login failed');
        }
      } catch (error) {
        console.error("Login action failed:", error);
        commit('SET_AUTHENTICATED', false);
        throw error;
      }
    },
    async signup({ commit }, payload) {
      try {
          const response = await fetch("http://localhost:3000/auth/signup", {
            method: 'POST',
            headers: { 'Content-TYPE': 'application/json'},
            body: JSON.stringify(payload),
            credentials: 'include'
          })

          const data = await response.json();

          if (response.ok) {
            commit('SET_AUTHENTICATED', true);
            if (data.user_id) {
              commit('SET_USER', { id: data.user_id });
            }
            return true;
          } else {
            commit('SET_AUTHENTICATED', false);
            return false;
          }
      } catch (error) {
        console.error("Signup failed:", error);
      }
    }
  },
  modules: {
  }
})