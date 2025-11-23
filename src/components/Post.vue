<template>
  <div class="post-box">
    <h3>{{ post.title }}</h3>
    <p>{{ post.body }}</p>
    <button @click="likePost(post.id)">
      Like ({{ post.likes }})
    </button>
  </div>
</template>

<script setup>
import { useStore } from "vuex"; // store kasutamiseks

const props = defineProps({
  post: Object
});

const store = useStore(); // ligipääs vuex storeile

const likePost = (postId) => {
  store.dispatch("likePost", postId); // actioni käivitamine
}; // kutsub vuex "likePost" ja annab edasi postitude, mida liketi
</script>

<style scoped>
.post-box {
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
}
</style>
