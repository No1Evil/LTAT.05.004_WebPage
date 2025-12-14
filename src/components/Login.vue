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
      <!---<div v-if="submitted" class="error-box">
      </div>-->

      <button type="submit">Log in</button> 
    
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from "vuex";
import router from '../js/router';

const store = useStore();

const email = ref("");
const password = ref("");
const submitted = ref(false);

const handleLogin = async () =>  {
  submitted.value = true;

  if (!email.value) {
    console.log("Email is required.")
  }

  try {
    const success = await store.dispatch('login', {
      email: email.value,
      password: password.value,
    })

    if (success) {
      console.log('Logged in')
      router.push('/')
    } else {
      console.log('Login failed')
    }

  } catch(e){
    console.error('Login failed', e.message)
  }

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
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
  color: #a94442;
  font-size: 14px;
}
</style>
