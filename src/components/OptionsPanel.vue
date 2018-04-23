<template>
  <div id="options">
    {{selectedWidget}}
    <room-options></room-options>
    <room-manager-server></room-manager-server>
    <grid></grid>
  </div>
</template>
<script>
import RoomOptions from '@/components/options/Room'
import RoomManagerServer from '@/components/options/RoomManagerServer'
import Grid from '@/components/options/Grid'

export default {
  components: {
    RoomOptions,
    RoomManagerServer,
    Grid
  },
  computed: {
    selectedWidget() {
      return this.$store.getters.selectedWidget
    }
  }
}
</script>
<style lang="less" scoped>

</style>
