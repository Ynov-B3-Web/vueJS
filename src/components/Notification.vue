<template>
  <div class="notif">
    <div
      :style="
        notif.type === 'success'
          ? 'background: rgba(1, 180, 1);'
          : 'background: rgb(214, 50, 50);'
      "
      class="top_notif"
    >
      <span>Notification</span>
      <span class="close_btn" @click="$emit('close-notif')">X</span>
    </div>

    <span class="content_notif">{{ notif.message }}</span>
  </div>
</template>

<script>
export default {
  props: ["notif"],
};
</script>

<style lang="scss">
.notif {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 2%;
  right: calc(50% - 150px);
  border-radius: 6px;
  min-width: 300px;
  box-shadow: 0px 0px 40px 1px rgba(0, 0, 0, 0.315);

  .top_notif {
    color: white;
    padding: 8px 0 6px 12px;
    border-radius: 6px 6px 0 0;

    .close_btn {
      float: right;
      margin-right: 8px;
      padding: 0 4px;
      font-weight: bold;
      cursor: pointer;
      color: black;
    }
  }
  .content_notif {
    font-style: italic;
    padding: 8px 0 6px 0;
    border-radius: 0 0 6px 6px;
    background: white;
    min-height: 50px;
    border: rgba(128, 128, 128, 0.37) 1px solid;
    align-items: center;
    display: flex;
    justify-content: center;
  }
}
</style>