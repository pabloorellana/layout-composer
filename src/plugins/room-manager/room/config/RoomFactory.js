import Vue from 'vue';
import RoomComponent from './Room';

export default function (props, store) {
  const Component = Vue.extend(RoomComponent);
  const instance = new Component({ store, propsData: props });
  instance.$mount();
  return instance;
}
