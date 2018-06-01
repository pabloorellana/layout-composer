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
      id: '',
      serviceName: '',
      credentials: {
        user: '',
        password: ''
      },
      namespace: 'room-manager'
    }
  }
}