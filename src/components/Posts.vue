<template>
  <div id="postList">
    <div v-for="post in posts" :key="post.id" class="post-card">
      
      <header class="post-header">
        <img 
          src="@/images/me.png" 
          alt="User Avatar" 
          class="post-avatar"
        >
        <div class="post-info">
          <h4 class="post-author">{{ post.username }}</h4>
          <p class="post-title">{{ post.title }}</p>
        </div>
        
        <span class="post-date">{{ formatDate(post.created_at) }}</span>
      </header>

      <div class="post-content">
        <p>{{ post.content }}</p>
        
        <div v-if="post.images && post.images.length">
          <img 
            v-for="image in post.images" 
            :key="image.url"
            :src="image.url"
            :alt="image.name"
            class="post-image"
          >
        </div>
      </div>

      <div class="post-actions">
        <button @click="incrementLike(post)">❤️ {{ post.likes }} likes</button>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getPosts } from '@/js/posts.js';

const posts = ref(getPosts())

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
    });
};

const incrementLike = (post) => {
    post.likes += 1;
};

</script>

<style scoped>
#postList {
    padding: 0;
}

.post-card {
    background-color: rgba(0,0,0,0.2);
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24); 
    margin-bottom: 20px;
    display: block; 
    width: 100%;
    box-sizing: border-box;
}

.post-header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    justify-content: space-between; 
}

.post-info {
    flex-grow: 1; 
}

.post-info > h4.post-author {
    color: #333;
    margin-top: 0;
    margin-bottom: 2px;
}

.post-date {
    margin-left: auto;
    font-size: 0.85em;
    color: #606770;
    white-space: nowrap; 
}

/* Pseudo-element usage */
.post-date::before {
    content: ">";
    margin-right: 5px;
    margin-left: 5px;
    color: goldenrod;
    font-weight: normal;
}

.post-avatar {
    width: 40px; 
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
    border: 1px solid #ccc;
}

.post-content + .post-actions {
    border-top: 1px solid rgba(0, 0, 0, 0.1); 
    padding-top: 10px;
    margin-top: 10px;
}

.post-content img.post-image {
    width: 20%;
    max-width: 30%;
    height: auto; 
    border-radius: 8px;
    margin-top: 10px;
}

</style>