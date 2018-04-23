export default {
  'room': function() {
    return {
      type: 'room',
      id: '',
      name: ''
    }
  },
  'room-manager-server': function() {
    return {
      type: 'room-manager-server',
      id: '',
      serviceName: '',
      credentials: {
        user: '',
        password: ''
      }
    }
  }
}