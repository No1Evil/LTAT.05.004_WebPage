import { createStore } from 'vuex';

// See Vuex documentation for more details: https://vuex.vuejs.org/
// Dunno what to do with that yet
const store = createStore({
  state() {
    return {
      posts: []
    };
  }
});

export default store;