<template>
  <div id="options" class="row">
    <div class="col-12">
      <grid></grid>
    </div>
    <div class="col-12">
      <div ref="container"></div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Grid from '@/components/options/Grid';
import WidgetFactoryMap from '@/plugins/room-manager/WidgetFactoryMap';

export default {
  components: {
    Grid
  },
  computed: {
    ...mapGetters(['selectedWidget'])
  },
  watch: {
    selectedWidget(newVal, oldVal) {
      while (this.$refs.container.firstChild) {
        this.$refs.container.removeChild(this.$refs.container.firstChild);
      }
      if (newVal) {
        const componentInstance = WidgetFactoryMap.config[newVal.type]();
        this.$refs.container.appendChild(componentInstance.$el);
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
