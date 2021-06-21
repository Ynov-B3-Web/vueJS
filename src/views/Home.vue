<template>
  <div>
    <hr />
    <Navbar
      v-model="gender"
      :filtered-list-count-length="filteredLength"
      :non-filtered-users-length="nonFilteredUsers.length"
      @fetchUsers="fetchUsers"
      @filter-search="search = $event"
    ></Navbar>
    <UserList
      :loading="loading"
      :gender="gender"
      :non-filtered-users="nonFilteredUsers"
      :search="search"
      @update-count="filteredLength = $event"
    ></UserList>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "@/components/Navbar.vue";
import UserList from "@/components/UserList.vue";

export default {
  components: {
    Navbar,
    UserList,
  },
  data() {
    return {
      gender: "",
      search: "",
      nonFilteredUsers: [],
      filteredLength: 0,
      loading: false,
    };
  },
  computed: {},
  created() {
    this.loading = true;
    setTimeout(() => this.fetchUsers(), 500);
  },
  methods: {
    fetchUsers() {
      axios("https://ynov-front.herokuapp.com/api/users").then(
        ({ data: { data } }) => {
          this.nonFilteredUsers = data.map((user) => ({
            age:
              new Date(
                Date.now() - new Date(user.birthDate).getTime()
              ).getFullYear() - 1970,
            name: `${user.firstName} ${user.lastName.toUpperCase()}`,
            email: user.email,
            id: user._id,
            phone: user.phone,
            gender: user.gender,
            avatarUrl: user.avatarUrl,
          }));
          this.loading = false;
        }
      );
    },
  },
};
</script>

<style lang="scss">
</style>
