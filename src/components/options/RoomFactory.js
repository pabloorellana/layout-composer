import Vue from 'vue';
import RoomComponent from './Room.vue';

export default function () {
  const Component = Vue.extend(RoomComponent);
  const instance = new Component({});
  instance.$mount();
  return instance;
}
