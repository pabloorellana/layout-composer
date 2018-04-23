import Vue from 'vue'
import GridComponent from './Grid.vue'

export default function () {
  const Component = Vue.extend(GridComponent);
  const instance = new Component({});
  instance.$mount();
  return instance;
}
