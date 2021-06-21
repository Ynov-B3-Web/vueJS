<template>
  <div class="modal_backdrop">
    <div class="modal">
      <div class="modal_header">
        <h2>Create user</h2>
        <span class="btn_close" @click="close">X</span>
      </div>
      <user-form class="form_user" @submitUser="postUser($event)" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import UserForm from "./UserForm.vue";
export default {
  components: { UserForm },
  methods: {
    close() {
      this.$emit("close");
    },
    reloadUsers() {
      this.$emit("reload-users");
    },
    postUser(user) {
      axios
        .post("https://ynov-front.herokuapp.com/api/users", user)
        .then(() => {
          this.close();
          this.reloadUsers();
          this.$emit("notif", { type: "success", message: "User created" });
        });
    },
  },
};
</script>

<style lang="scss">
.modal_backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  min-width: 500px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;

  .modal_header {
    padding: 15px;
    justify-content: right;
    display: flex;
    border-radius: 0;
    border: 0;

    h2 {
      margin: 0 auto;
      padding-left: 15px;
    }
    .btn_close {
      float: right;
      padding: 0 4px;
      font-weight: bold;
      cursor: pointer;
      color: black;
    }
  }

  .form_user {
    padding: 20px;
  }
}
</style>