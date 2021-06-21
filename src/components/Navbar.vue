<template>
  <div class="searchbox">
    <input
      @input="$emit('filter-search', $event.target.value)"
      type="text"
      placeholder="Recherche par nom ou prénom"
      class="input _search"
    />
    <select
      id="genders"
      name="genders"
      class="input _gender"
      @change="$emit('filter-gender', $event.target.value)"
    >
      <option value="">All</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>
    <span v-if="gender != ''" class="input _counter">
      {{ filteredListCountLength }} {{ gender }} /
      {{ nonFilteredUsersLength }} users</span
    >
    <span v-else class="input _counter"
      >{{ nonFilteredUsersLength }} users</span
    >
    <button class="input _fetch" @click="$emit('fetchUsers')">
      Fetch users
    </button>
    <button class="input _create" v-if="!modalShow" @click="modalShow = true">
      Create user
    </button>
    <user-modal
      v-else
      @close="modalShow = false"
      @reload-users="$emit('fetchUsers')"
    />
  </div>
</template>

<script>
import UserModal from "./UserModal.vue";

export default {
  components: { UserModal },
  data() {
    return {
      modalShow: false,
    };
  },
  model: {
    prop: "gender",
    event: "filter-gender",
  },
  props: {
    filteredListCountLength: { type: Number, default: 0 },
    nonFilteredUsersLength: { type: Number, default: 0 },
    gender: { type: String, default: "" },
  },
};
</script>
<style lang="scss" scoped>
.searchbox {
  display: flex;
  padding: 0 10px 18px 18px;

  * {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }
  .input {
    margin: 0 20px 0 0;

    &._search {
      max-width: 1200px;
      width: 100%;
      border-radius: 20px;
      border: solid 1px rgb(229, 232, 235);
      padding: 0 20px;
      outline: none;
    }

    &._fetch,
    &._create {
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

    &._gender {
      background: rgb(255, 255, 255) none repeat scroll 0% 0%;
      color: rgb(14, 14, 14);
      height: 48px;
      padding: 0px 12px;
      border-radius: 5px;
      border: 1px solid rgb(229, 232, 235);
    }

    &._counter {
      margin-left: auto;
      align-items: center;
      display: flex;
    }
  }
}
</style>