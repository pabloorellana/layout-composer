<template>
  <div class="room-manager-server">
    <label>RM Service</label>
  </div>
</template>
<script>
export default {
  mounted() {
    console.log('XDXDXD')
    this.$store.commit('addToState', {key: 'rooms', data: [{
        id: '1',
        name: 'punata'
      }, {
        id: '2',
        name: 'tarata'
      }, {
        id: '3',
        name: 'mizque'
      }
    ]})
  }
}
</script>
<style lang="less" scoped>
.room-manager-server {
  height: 100%;
  width: 100%;
  background-color: green;
}
</style>
