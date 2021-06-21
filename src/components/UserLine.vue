<template>
  <tr class="user">
    <td>
      <img class="avatar" :src="user.avatarUrl" />
    </td>
    <td v-html="user.nameFormated">{{ user.nameFormated }}</td>
    <td>{{ user.email }}</td>
    <td>{{ user.phone }}</td>
    <td>{{ user.age }}</td>
    <td>{{ user.gender }}</td>
    <td>
      <router-link :to="{ path: '/users/' + user.id, params: { user: user } }">
        <a class="details">Voir les détails</a>
      </router-link>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  computed: {},
};
</script>

<style lang="scss">
.user {
  .avatar {
    border-radius: 50px;
    max-width: 60px;
    max-height: 60px;
  }
  a {
    text-decoration: none;
  }
  .details {
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
}
</style>
