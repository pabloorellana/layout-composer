import Vue from 'vue';
import RoomManagerServerComponent from './RoomManagerServer.vue';

export default function () {
  const Component = Vue.extend(RoomManagerServerComponent);
  const instance = new Component({});
  instance.$mount();
  return instance;
}
