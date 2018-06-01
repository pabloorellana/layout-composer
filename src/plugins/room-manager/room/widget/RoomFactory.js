import Vue from 'vue';
import RoomWidgetComponent from './Room';

export default function (props, store) {
  const Component = Vue.extend(RoomWidgetComponent);
  const instance = new Component({ store, propsData: { roomInfo: props } });
  instance.$mount();
  return instance;
}
