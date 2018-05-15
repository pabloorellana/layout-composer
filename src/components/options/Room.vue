<template>
  <div class="room-options">
    <b-dropdown id="rooms-dropdown" size="sm" variant="default" :text="selectedRoom.name" class="m-md-2">
      <b-dropdown-item v-for="(room, index) in rooms" :key="index"
        @click="selectRoom(room)">{{room.name}}</b-dropdown-item>
    </b-dropdown>
  </div>
</template>
<script>
import bDropdown from 'bootstrap-vue/es/components/dropdown/dropdown';

export default {
  components: {
    bDropdown
  },
  data() {
    return {
      selectedRoom: this.$store.getters.selectedWidget
    }
  },
  computed: {
    rooms() {
      return this.$store.getters.rooms
    }
  },
  methods: {
    selectRoom(room) {
      this.selectedRoom = room;
      this.$store.commit('setSelectedRoom', room);
    }
  }
}
</script>
<style lang="less" scoped>

</style>
