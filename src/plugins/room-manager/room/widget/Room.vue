<template>
  <div class="room">
    <label>{{roomInfo.name}}</label>
  </div>
</template>
<script>
export default {
  props: {
    roomInfo: {
      default() {
        return {}
      }
    }
  }
}
</script>
<style lang="less" scoped>
.room {
  color: #fff;
  text-align: center;
  height: 100%;
  width: 100%;
  background-color: blue;
}
</style>

