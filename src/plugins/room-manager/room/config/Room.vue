<template>
  <div class="room-options">
    <div v-if="!rooms.length">
      <span>No Room Manager Service has been added yet.</span>
    </div>
    <div class="form-group" v-if="rooms && rooms.length">
      <label for="rooms-dropdown">Room Assigned</label>
      <b-dropdown id="rooms-dropdown" size="sm" variant="default" :text="selectedRoom.name" class="m-md-2">
        <b-dropdown-item v-for="(room, index) in rooms" :key="index"
          @click="selectRoom(room)">{{room.name}}</b-dropdown-item>
      </b-dropdown>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
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
    ...mapGetters('room-manager', ['rooms']),
  },
  methods: {
    selectRoom(room) {
      this.selectedRoom = room;
      this.$store.commit('room-manager/setSelectedRoom', { _id: room._id, name: room.name, type: 'room' });
    }
  }
}
</script>
<style lang="less" scoped>

</style>
