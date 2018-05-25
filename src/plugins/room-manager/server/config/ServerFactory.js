import Vue from 'vue';
import store from '@/store';
import RmServer from './Server.vue';

export default function () {
  const Component = Vue.extend(RmServer);
  const instance = new Component({ store });
  instance.$mount();
  return instance;
}
