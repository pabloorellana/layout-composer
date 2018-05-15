<template>
  <div class="room-manager-server">
    <label>RM Service</label>
  </div>
</template>
<script>
export default {
  mounted() {
    this.$store.commit('addToState', {key: 'rooms', data: [{
        id: '1',
        name: 'punata'
      }, {
        id: '2',
        name: 'tarata'
      }, {
        id: '3',
        name: 'mizque'
      }, {
        id: '4',
        name: 'quillacollo'
      }, {
        id: '5',
        name: 'arani'
      }, {
        id: '6',
        name: 'chimore'
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
