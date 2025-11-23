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
      <div v-if="submitted && passwordErrors.length" class="error-box">
        <p><strong>Password is not valid:</strong></p>
        <ul>
          <li v-for="(err,i) in passwordErrors" :key="i">{{ err }}</li>
        </ul>
      </div>


      <button type="submit">Log in</button> 
    
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const email = ref("");
const password = ref("");
const submitted = ref(false);

const passwordErrors = computed(() => {
  const errors = [];
  const pw = password.value;

  if (pw.length < 8 || pw.length > 15)
    errors.push("Password must be between 8 and 15 characters")

  if (!/^[A-Z]/.test(pw))
    errors.push("Password must start with an uppercase letter.")

  if (!/[A-Z]/.test(pw))
    errors.push("Password must include at least one uppercase letter.")

  if ((pw.match(/[a-z]/g) || []).length < 2)
      errors.push("Password must include at least two lowercase letters.");

  if (!/\d/.test(pw))
    errors.push("Password must include at least one numeric value.");

  if (!pw.includes("_"))
    errors.push("Password must include the '_' character.");

    return errors;
  });

function handleLogin() {
 submitted.value = true;

 if (!email.value) {
  console.log("Email is required.")
  }



  if (passwordErrors.value.length > 0 || !password.value) {
    console.log("Password invalid:", passwordErrors.value)
    return;
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
