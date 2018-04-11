<template>
  <div class="container">

    <header>
      <div class="headerbody">
        <h1>marsblog</h1>
      </div>
      <div class="headerbottom">
        <button v-if="!authenticated" @click="login()">Login</button>
        <button v-if="authenticated" @click="logout()">Logout</button>

        <router-link v-if="authenticated" to="/news">News</router-link>
        <router-link v-if="authenticated" to="/news/create">Create News</router-link>
      </div>
    </header>

    <main>
      <!-- TODO: Marian - Do not use prop but storage? -->
      <router-view
        :auth="auth"></router-view>
    </main>
  </div>
</template>

<script>
import AuthService from "./../api/AuthService";

const auth = new AuthService();
const { login, logout, authenticated } = auth;

export default {
  data() {
    return {
      auth,
      authenticated
    };
  },
  methods: {
    login,
    logout
  }
};
</script>
