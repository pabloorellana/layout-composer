<template>
  <div class="server-config row">
    <div class="col-12">
      <div class="form-group">
        <label for="connectionName">Connection Name</label>
        <input id="connectionName" type="text" class="form-control" v-model="connectionName">
      </div>
      <div class="form-group">
        <label for="server-url">Room Manager Server URL</label>
        <input id="server-url" type="text" class="form-control" v-model="serverUrl">
      </div>
      <div v-if="selectedService">
        <div class="form-group">
          <label for="service-type">Service Type</label>
          <input id="service-type" type="text" class="form-control" v-model="selectedService.type" disabled>
        </div>
        <div class="form-group">
          <label for="service-name">Name</label>
          <input id="service-name" type="text" class="form-control" v-model="selectedService.name" disabled>
        </div>
        <div class="form-group">
          <label for="service-hostname">Hostname</label>
          <input id="service-hostname" type="text" class="form-control" v-model="selectedService.hostname" disabled>
        </div>
      </div>
      <button id="connect-btn" class="btn btn-success btn-sm" @click="connect">Connect</button>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
import axios from 'axios';

export default {
  data() {
    return {
      services: [],
      selectedService: undefined
    }
  },
  mounted() {
    //this.connect();
    //serverUrl: 'http://localhost:7070'
  },
  methods: {
    ...mapMutations('room-manager', [
      'setRooms',
      'setConnectionName',
      'setServerUrl'
    ]),
    async connect() {
      const {data} = await axios.get(`${this.serverUrl}/api/v1/services`);
      if (data.length > 1) {
        // TODO if there is more than one service show a dropdown to select a service
        this.services = data;
        return;
      }

      this.selectedService = data[0];
      this.getRooms();
    },
    async getRooms() {
      // TODO
      // Pending, select rooms by service instance
      //          add flat to enable/disable rooms
      const {data} = await axios.get(`${this.serverUrl}/api/v1/rooms`);
      const rooms = data.filter(room => room.service === this.selectedService._id);
      this.setRooms(rooms);
    }
  },
  computed: {
    connectionName: {
      get() {
        return this.$store.getters['room-manager/connectionName'];
      },
      set(value) {
        this.setConnectionName(value);
      }
    },
    serverUrl: {
      get() {
        return this.$store.getters['room-manager/serverUrl'];
      },
      set(value) {
        this.setServerUrl(value);
      }
    },
  }
}
</script>
<style lang="less" scoped>
.server-config {
  border: 1px solid #eee;
}
</style>
