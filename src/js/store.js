import { createStore } from 'vuex';

// See Vuex documentation for more details: https://vuex.vuejs.org/
// Dunno what to do with that yet
const store = createStore({
  // store algandmed, postitused
  state() {
    return {
      posts: [
      { id: 1, title: "Post 1", body: "This is the body of post 1", likes: 0 },
      { id: 2, title: "Post 2", body: "This is the body of post 2", likes: 0 },
      { id: 3, title: "Post 3", body: "This is the body of post 3", likes: 0 },
      { id: 4, title: "Post 4", body: "This is the body of post 4", likes: 0 },
      { id: 5, title: "Post 5", body: "This is the body of post 5", likes: 0 },
      { id: 6, title: "Post 6", body: "This is the body of post 6", likes: 0 },
      { id: 7, title: "Post 7", body: "This is the body of post 7", likes: 0 },
      { id: 8, title: "Post 8", body: "This is the body of post 8", likes: 0 },
      { id: 9, title: "Post 9", body: "This is the body of post 9", likes: 0 },
      { id: 10, title: "Post 10", body: "This is the body of post 10", likes: 0 }
    ]
    };
  },
  // saab muuta algandmeid (state muutmine), ei tohi sisaldada asünkroonset koodi
  mutations: {
    // like arvu suurendamine
    INCREMENT_LIKE(state, postId) {
      const post = state.posts.find(p => p.id === postId); // otsib postituse id järgi
      if (post) post.likes++; // suurendab likede arvu
    },
    // like arvu resetimiseks
    RESET_LIKES(state) {
      state.posts.forEach(p => (p.likes = 0));
    }
  },
  // actionid, mida kutsutakse store.dispatch
  actions: {
    likePost({ commit }, postId) { // kustub INCREMENT_LIKE ja annab edasi id
      commit('INCREMENT_LIKE', postId);
    },
    resetLikes({ commit }) {
      commit('RESET_LIKES');
    }
  },
  // võtavad state ja tagastavad midagi
  getters: {
    getPosts: (state) => state.posts // tagastab kogu posts array
  }
});

export default store;