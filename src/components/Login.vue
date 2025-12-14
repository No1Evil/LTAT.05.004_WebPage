<template>
  <div class ="login-wrapper">
    <form class="login-form" @submit.prevent="handleLogin">

      <div class = "form-group">
        <label for ="email">Email</label>
        <input v-model="email" type="email" placeholder="Email">
      </div>
      
      <div class = "form-group">
        <label for="password">Password</label>
        <input v-model="password" type="password" placeholder="Password">
      </div>

      <div class="container">
        <button class="center">LogIn</button>
        <button @click='router.push("/signup")' class="center">Signup</button>
      </div>
      <div v-if="errorMessage" class="error-box">
        <p><strong>{{ errorMessage }}</strong></p>
      </div>
    
    </form>
  </div>
</template>

<script setup>
import { ref} from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref("");
const password = ref("");
const submitted = ref(false);
const errorMessage = ref("");

async function handleLogin() {
 submitted.value = true;

 if (!email.value) {
  console.log("Email is required.")
  }

    var data = {
      email: email.value,
      password: password.value
    };
    fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
        credentials: 'include', 
        body: JSON.stringify(data),
    })
    .then(async (response) => {
    const data = await response.json();
    if (!response.ok) {
      // login failed
      console.error("Login failed:", data.error);
      errorMessage.value = data.error;
      return; // stop here, don’t redirect
    }
    // login succeeded
    console.log("Login success:", data);
    router.push("/");
  })
  .catch((e) => {
    console.error("Network error:", e);
  });
    

  console.log("Logging in with:", email.value, password.value)
}
</script>

<style scoped>
/* Login form */
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffffff;
}

.login-form {
  background-color: rgba(0, 0, 0, 0.22);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  width: 320px;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #333;
}

input {
  width: 95%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.signup-button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button {
  width: 100%;
  background-color: #004080;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 5px;
}

button:hover {
  background-color: #0056b3;
}

.error-box {
  background: #ffefef;
  border: 1px solid #d9534f;
  padding: 5px;
  border-radius: 5px;
  margin-top: 15px;
  color: #a94442;
  font-size: 14px;
}

.center {
  margin: auto;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  width: 30%; 
}
.container {
  display: flex;
  justify-content: center;
}
</style>
