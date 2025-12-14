<template>
  <div class="AllPosts">
    <div id="post-list">
    <h1>All Posts</h1>
     <div class="container">
    </div>
      <ul>
        <div class="item" v-for="post in posts" :key="post.id">
            <a class= 'singlepost' :href="'/apost/' + post.id">
            <span class="title"> <b>Title:</b> {{ post.title }}  </span><br />
            <span class="body"> <b>Body:</b> {{ post.body }} </span> <br />
            <span class="url"> <b>Url:</b> {{ post.urllink }} </span> <br />
            <span class="time"><b>Posted:</b> {{ formatDate(post.created_at) }}</span><br />
          </a>
        </div>
      </ul>
    </div>
    <button @click='router.push("/create-post")' class="center">Add post</button>
    <button @click="deleteAllPosts" class="center">Delete all</button>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const posts = ref([]);

function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString('et-EE'); 
}

const deleteAllPosts = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/posts`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete posts.');
    }

    const result = await response.json();
    console.log("Delete all successful:", result);
    
    fetchPosts();

  } catch (error) {
    console.error("Error deleting all posts:", error);
    alert(`Deletion failed. Error: ${error.message}. Are you logged in?`);
  }
};

const fetchPosts = () => {
  console.log("Fetching posts...");
  
  fetch(`http://localhost:3000/api/posts/`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      posts.value = data;
    })
    .catch((err) => {
      console.error("Error fetching posts:", err.message);
    });
};

onMounted(() => {
  fetchPosts();
  console.log("mounted");
});
</script>

<style scoped>
h1 {
  font-size: 20px;
}
a {
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
.item {
  background: rgb(189, 212, 199);
  margin-bottom: 5px;
  padding: 3px 5px;
  border-radius: 10px;
}
#post-list {
  background: #6e8b97;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
  padding: 10px 20px;
  margin: auto;
  width: 50%;
  border-radius: 20px;
}
#post-list ul {
  padding: 0;
}
#post-list li {
  display: inline-block;
  margin-right: 10px;
  margin-top: 10px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.7);
}
</style>