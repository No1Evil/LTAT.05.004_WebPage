<template>
  <div class="home-page">
    <div class="posts-container">
      <PostComponent
        v-for="post in posts"
        :key="post.id"
        :post="post"
      />
    </div>
    <button @click="resetLikes" class="reset-btn">Reset Likes</button>
  </div>
</template>

<script setup>
import { computed } from "vue"; // reaktiivsete arvutatud väärtuste loomine, uuenevad automaatselt, kui sõltuvused muutuvad
import { useStore } from "vuex";
import PostComponent from "../components/Post.vue"; // postComponentid

const store = useStore();

// posts saab storest tagastatud array
const posts = computed(() => store.state.posts);

// paneb tööle actioni like arvu resetimiseks
const resetLikes = () => {
  store.dispatch("resetLikes");
};
</script>

<style scoped>
.posts-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
}

.reset-btn {
  border: black;
  background-color: white;
  color: red;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 10px;
  margin-top: 10px;
  font-weight: bold;
}

.reset-btn:hover {
  background-color: #fcebea;
}
</style>
