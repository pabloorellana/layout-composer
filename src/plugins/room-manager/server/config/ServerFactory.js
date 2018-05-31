import Vue from 'vue';
import RmServer from './Server.vue';

export default function (props, store) {
  const Component = Vue.extend(RmServer);
  const instance = new Component({ store, propsData: props });
  instance.$mount();
  return instance;
}
