<template>
  <form
    v-if="!edit"
    class="form_create"
    method="POST"
    @submit.prevent="postUser"
  >
    <label for="firstName"
      >Prénom
      <input v-model="firstName" required />
    </label>
    <label for="lastName"
      >Nom
      <input v-model="lastName" required />
    </label>
    <label for="birthDate"
      >Naissance
      <input v-model="birthDate" type="date" required />
    </label>
    <label for="email"
      >Email
      <input v-model="email" type="email" required />
    </label>
    <label for="phone"
      >Tel
      <input v-model="phone" name="phone" type="phone" required />
    </label>
    <select v-model="gender">
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>
    <label for="avatarUrl"
      >Avatar_Url <input v-model="avatarUrl" name="avatarUrl" required
    /></label>
    <label for="details"
      >Details
      <textarea v-model="details" />
    </label>
    <h2 v-if="error">
      {{ error }}
    </h2>
    <button type="submit">Submit</button>
  </form>
  <form class="form_create" v-else method="POST" @submit.prevent="putUser">
    <label for="firstName"
      >Prénom
      <input v-model="editUser.firstName" required />
    </label>
    <label for="lastName"
      >Nom
      <input v-model="editUser.lastName" required />
    </label>
    <label for="birthDate"
      >Naissance
      <input v-model="editUser.birthDate" type="" />
    </label>
    <label for="email"
      >Email
      <input v-model="editUser.email" type="email" required />
    </label>
    <label for="phone"
      >Tel
      <input v-model="editUser.phone" name="phone" type="phone" required />
    </label>
    <select v-model="editUser.gender">
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>
    <label for="avatarUrl"
      >Avatar_Url <input v-model="editUser.avatarUrl" name="avatarUrl" required
    /></label>
    <label for="details"
      >Details
      <textarea v-model="editUser.details" />
    </label>
    <button type="submit">Submit</button>
    <button @click.prevent="$emit('edit_stop')">Stop editing</button>
  </form>
</template>

<script>
export default {
  props: ["user", "edit"],
  data() {
    return {
      firstName: "",
      editUser: this.user,
      lastName: "",
      birthDate: new Date(),
      email: "",
      phone: "",
      gender: "male",
      avatarUrl: "",
      details: "",
      error: "",
    };
  },
  methods: {
    postUser() {
      if (
        this.email &&
        this.firstName &&
        this.lastName &&
        this.birthDate &&
        this.avatarUrl &&
        this.phone
      ) {
        this.error = "";
        const user = {
          birthDate: this.birthDate,
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          phone: this.phone,
          gender: this.gender,
          avatarUrl: this.avatarUrl,
          details: this.details,
        };
        // console.log(user);
        this.$emit("submitUser", user);
      } else {
        this.error = "Missing Fields";
      }
    },
    putUser() {
      this.$emit("submitUser", this.editUser);
    },
  },
};
</script>

<style lang="scss">
.form_create {
  display: flex;
  flex-direction: column;

  label,
  select,
  button {
    width: min-content;
    margin: 10px auto;
  }

  label {
    color: #2c3e50;
    font-weight: bold;
    input,
    textarea {
      margin-top: 5px;
      border: 1px solid rgb(158, 158, 158);
      border-radius: 4px;
      padding: 8px 30px;
    }
  }

  button {
    margin-left: auto;
    align-items: center;
    background-color: rgb(32, 129, 226);
    border-radius: 5px;
    color: white;
    cursor: pointer;
    display: inline-flex;
    font-size: 16px;
    font-weight: 600;
    justify-content: center;
    padding: 12px 20px;
    text-align: center;
    user-select: none;
    max-height: 100%;
    border: 1px solid rgb(32, 129, 226);

    &:hover {
      transition: all 0.2s ease 0s;
      box-shadow: rgba(14, 14, 14, 0.25) 0px 0px 8px 0px;
      background-color: rgb(24, 104, 183);
    }
  }

  select {
    background: rgb(255, 255, 255) none repeat scroll 0% 0%;
    color: rgb(14, 14, 14);
    height: 48px;
    padding: 0px 12px;
    border-radius: 5px;
    border: 1px solid rgb(158, 158, 158);
    font-size: 16px;
  }
}
</style>
