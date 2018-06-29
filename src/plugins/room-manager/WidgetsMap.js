export default {
  'room': function() {
    return {
      type: 'room',
      _id: '',
      name: '',
      namespace: 'room-manager'
    }
  },
  'room-manager-server': function() {
    return {
      type: 'room-manager-server',
      connectionName: '',
      serverUrl: '',
      namespace: 'room-manager'
    }
  }
}