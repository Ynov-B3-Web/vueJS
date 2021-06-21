<template>
  <table>
    <div v-if="loading" class="loader"></div>
    <thead>
      <tr>
        <th />
        <th
          class="sortable"
          :class="sortBy === 'name' ? sortDirection : ''"
          @click="sort('name')"
        >
          Nom
        </th>
        <th>Email</th>
        <th>Tel</th>
        <th
          class="sortable"
          :class="sortBy === 'age' ? sortDirection : ''"
          @click="sort('age')"
        >
          Naissance
        </th>
        <th>Gender</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <UserLine
        v-for="user in filteredList"
        :key="user.email"
        :user="user"
      ></UserLine>
    </tbody>
  </table>
</template>

<script>
import UserLine from "@/components/UserLine.vue";

export default {
  components: {
    UserLine,
  },
  props: {
    loading: { type: Boolean, default: false },
    gender: { type: String, default: "" },
    nonFilteredUsers: {
      type: Array,
      default() {
        return [];
      },
    },
    search: { type: String, default: "" },
  },
  data() {
    return {
      sortBy: "",
      sortDirection: "asc",
    };
  },
  computed: {
    searchWords() {
      return this.search.toLowerCase().split(" ");
    },
    filteredList() {
      return this.nonFilteredUsers
        .filter((user) => {
          if (this.gender === "") return true;
          return user.gender === this.gender;
        })
        .filter((user) =>
          this.searchWords.every((word) =>
            user.name
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .includes(word)
          )
        )
        .sort((p1, p2) => {
          if (!this.sortBy) return 0;
          const modifier = this.sortDirection === "asc" ? 1 : -1;
          if (typeof p1[this.sortBy] === "number")
            return modifier * (p1[this.sortBy] - p2[this.sortBy]);

          return modifier * p1[this.sortBy].localeCompare(p2[this.sortBy]);
        })
        .map((user) => {
          const nameFormated = this.searchWords.length
            ? user.name.replace(
                new RegExp(this.searchWords.join("|"), "gi"),
                '<span class="highlight">$&</span>'
              )
            : user.name;

          return {
            ...user,
            nameFormated,
          };
        });
    },
  },
  watch: {
    filteredList(value) {
      this.$emit("update-count", value.length);
    },
  },
  methods: {
    sort(sortby) {
      if (sortby === this.sortBy) {
        if (this.sortDirection === "desc") {
          this.sortBy = "";
          this.sortDirection = "asc";
          return;
        }

        if (this.sortDirection === "asc") {
          this.sortDirection = "desc";
          return;
        }
      }
      this.sortDirection = "asc";
      this.sortBy = sortby;
    },
  },
};
</script>

<style lang="scss">
table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 1rem;
  background-color: transparent;
  th,
  td {
    vertical-align: middle;
    border-top: 1px solid #e9ecef;
    padding: 0.75rem;
  }
  .sortable {
    cursor: pointer;
    user-select: none;
  }
  .asc:after,
  .desc:after {
    padding-left: 4px;
  }
  .asc:after {
    content: "\25B2";
  }
  .desc:after {
    content: "\25BC";
  }
  .highlight {
    font-weight: bold;
  }
}
.loader {
  animation:spin 0.6s infinite linear;
  border:solid 2vmin transparent;
  border-radius:50%;
  border-right-color:#09f;
  border-top-color:#09f;
  box-sizing:border-box;
  height:15vmin;
  left:calc(50% - 10vmin);
  position:fixed;
  top:calc(50% - 10vmin);
  width:15vmin;
  z-index:1;
}

@keyframes spin {
  100% {
    transform:rotate(360deg);
  }
}
</style>