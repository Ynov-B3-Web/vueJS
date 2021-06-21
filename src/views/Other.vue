<template>
  <div>
    <h1>Other</h1>
    <span>Value : {{ other.value }}</span>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      other: null,
    };
  },
  mounted() {
    axios
      .get("/api/other", {
        headers: {
          Accept: "application/json",
        },
      })
      .then((r) => {
        this.other = r.data;
      })
      .catch((err) => console.error(err));
  },
};
</script>
<style lang="scss">
</style>