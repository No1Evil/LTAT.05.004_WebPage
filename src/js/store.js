import { createStore } from 'vuex';
import postsData from "../Data/posts.json"; // sünkroonne import JSON failist


import postsData from "@/old_files/tempDatabase/posts.json"; // sünkroonne import JSON failist

const store = createStore({
  // store algandmed, postitused
  state() {
    return {
      posts: postsData // võtame json andmed 
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