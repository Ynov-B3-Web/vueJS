<template>
  <user-form @submitUser="putUser($event)" />
</template>

<script>
import axios from "axios";
import UserForm from "../components/UserForm.vue";
export default {
  components: { UserForm },
  methods: {
    putUser(user) {
      axios
        .post("https://ynov-front.herokuapp.com/api/users", user)
        .then(() => {
          this.$router.push({ name: "Home" });
          this.$emit("notif", {
            type: "success",
            message: "User created",
          });
        });
    },
  },
};
</script>

<style>
</style>