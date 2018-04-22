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
      rooms: [{
        id: '1',
        name: 'punata'
      }, {
        id: '2',
        name: 'tarata'
      }, {
        id: '3',
        name: 'mizque'
      }],
      selectedRoom: {}
    }
  },
  mounted() {
    this.selectedRoom = this.rooms[0];
  },
  methods: {
    selectRoom(room) {
      this.selectedRoom = room;
    }
  }
}
</script>
<style lang="less" scoped>

</style>
