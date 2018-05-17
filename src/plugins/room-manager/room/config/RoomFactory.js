import Vue from 'vue';
import store from '@/store';
import RoomComponent from './Room';

export default function () {
  const Component = Vue.extend(RoomComponent);
  const instance = new Component({ store });
  instance.$mount();
  return instance;
}
