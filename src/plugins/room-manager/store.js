export default {
  namespaced: true,
  state() {
    return {
      type: 'room-manager-server',
      connectionName: '',
      serverUrl: '',
      services: [],
      rooms: []
    }
  },
  getters: {
    rooms: state => state.rooms,
    connectionName: state => state.connectionName,
    serverUrl: state => state.serverUrl
  },
  mutations: {
    setRooms: (state, payload) => {
      state.rooms = payload;
    },
    setConnectionName: (state, connectionName) => {
      state.connectionName = connectionName
    },
    setServerUrl: (state, serverUrl) => {
      state.serverUrl = serverUrl
    },
    setSelectedRoom(state, {_id, name, type}) {
      this.commit('patchSelectedWidget', {_id, name, type}, { root: true });
    }
  },
  actions: {}
}