<template>
  <div class ="login-wrapper">
    <form class="login-form" @submit.prevent="handleSignup">

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
      <div v-if="errorMessage" class="error-box">
      <p><strong>{{ errorMessage }}</strong></p>
    </div>


      <button type="submit">Signup</button> 
    
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const email = ref("");
const password = ref("");
const submitted = ref(false);

const errorMessage = ref("");

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

async function handleSignup() {
  submitted.value = true;
  errorMessage.value = ""; // clear old errors

  if (!email.value) {
    errorMessage.value = "Email is required.";
    return;
  }

  if (passwordErrors.value.length > 0 || !password.value) {
    errorMessage.value = "Password invalid: " + passwordErrors.value.join(", ");
    return;
  }

  const data = { 
    email: email.value, 
    password: password.value 
  };

  
    fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    })
    .then(async (response) => {
    const result = await response.json();

    if (!response.ok) {
      // backend returned an error
      errorMessage.value = result.error || "Signup failed.";
      return;
    }

    console.log("Signup success:", result);
    router.push("/");
  })
   .catch ((e) => {
    errorMessage.value = "Network error, please try again.";
    console.error(e);
  });
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
