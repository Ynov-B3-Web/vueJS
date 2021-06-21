  <template>
  <div v-if="!editing" class="page">
    <router-link class="return" :to="{ name: 'Home' }"> Go back </router-link>
    <div>
      <img class="avatarUrl" :src="user.avatarUrl" />
      <p class="name">{{ user.name }}</p>
    </div>
    <div class="basic">
      <div class="block">
        <p>Email</p>
        <p>{{ user.email }}</p>
      </div>
      <div class="block">
        <p>Phone</p>
        <p>{{ user.phone }}</p>
      </div>
    </div>
    <div class="basic">
      <div class="block">
        <p>Gender</p>
        <p>{{ user.gender }}</p>
      </div>
      <div class="block">
        <p>Age</p>
        <p>{{ user.age }}</p>
      </div>
    </div>
    <div class="basic">
      <div class="block">
        <p>Info</p>
        <p>{{ user.details }}</p>
      </div>
    </div>
    <button @click="editing = true">Edit User</button>
  </div>
  <user-form
    v-else
    :user="user"
    :edit="true"
    @edit_stop="editing = false"
    @submitUser="putUser($event)"
  />
</template>

<script>
import axios from "axios";
import UserForm from "../components/UserForm.vue";
export default {
  components: { UserForm },
  data() {
    return {
      loading: true,
      user: {},
      editing: false,
      name: "",
      email: "",
      phone: "",
      info: "",
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      this.loading = true;
      axios(
        `https://ynov-front.herokuapp.com/api/users/${this.$route.params.id}`
      ).then(({ data }) => {
        // this.user = data.data;
        this.loading = false;
        this.user = {
          id: data.data._id,
          age: this.getAge(data.data.birthDate),
          birthDate: data.data.birthDate,
          name: `${data.data.firstName} ${data.data.lastName.toUpperCase()}`,
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          email: data.data.email,
          phone: data.data.phone,
          gender: data.data.gender,
          avatarUrl: data.data.avatarUrl,
          details: data.data.details,
        };
      });
    },
    getAge(dateString) {
      const today = new Date();
      const birthDate = new Date(dateString);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age -= 1;
      }
      return age;
    },
    async putUser(user) {
      try {
        await axios.put(
          `https://ynov-front.herokuapp.com/api/users/${user.id}`,
          user
        );
        this.$router.push({ name: "Home" });
        this.$emit("notif", {
          type: "success",
          message: "User has been edited",
        });
      } catch {
        this.$emit("notif", { type: "fail", message: "Error" });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.page {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
}
.name {
  font-weight: bold;
  font-size: 20px;
}
.basic {
  display: flex;
  .block {
    margin: 10px;
    display: flex;
    border: 1px solid rgb(158, 158, 158);
    border-radius: 4px;
    width: 20vw;
    & > p {
      align-items: center;
      padding: 6px 24px;
      display: flex;
      justify-content: left;

      &:nth-child(1) {
        flex: 1;
        font-weight: bold;
      }
      &:nth-child(2) {
        flex: 2;
      }
    }
  }
}
.return {
  text-decoration: none;
  cursor: pointer;
  background-color: rgb(32, 129, 226);
  border-radius: 5px;
  padding: 12px 20px;
  border: 1px solid rgb(32, 129, 226);
  color: white;

  &:hover {
    transition: all 0.2s ease 0s;
    box-shadow: rgba(14, 14, 14, 0.25) 0px 0px 8px 0px;
    background-color: rgb(24, 104, 183);
  }
}
.avatarUrl {
  margin: 30px 0 0px 0;
  max-height: 180px;
  max-width: 180px;
  border: 1px solid rgb(204, 204, 204);
  border-radius: 50%;
}
</style>