import Vue from 'vue';
import store from '@/store';
import RoomWidgetComponent from './Room';

export default function (props) {
  const Component = Vue.extend(RoomWidgetComponent);
  const instance = new Component({ store, propsData: { roomInfo: props } });
  instance.$mount();
  return instance;
}
