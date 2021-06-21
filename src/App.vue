<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"> Home </router-link>
      <Notification v-if="notif" :notif="notif" @close-notif="notif = null" />
    </div>
    <router-view @notif="assignAndWait($event)" />
  </div>
</template>
<script>
import Notification from "./components/Notification.vue";

export default {
  components: {
    Notification,
  },
  data() {
    return {
      notif: null,
    };
  },
  methods: {
    assignAndWait(notif) {
      this.notif = notif;
      setTimeout(() => {
        this.notif = null;
      }, 4000);
    },
  },
};
</script>

<style lang="scss">
body {
  margin: 0;

  hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
  }
  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;
      text-decoration: none;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
}
</style>
