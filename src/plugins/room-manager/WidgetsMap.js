export default {
  'room': function() {
    return {
      type: 'room',
      _id: '',
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