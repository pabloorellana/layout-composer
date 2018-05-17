import Vue from 'vue';
import RmServer from './Server.vue';

export default function () {
  const Component = Vue.extend(RmServer);
  const instance = new Component({});
  instance.$mount();
  return instance;
}
