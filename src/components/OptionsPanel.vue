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
import ComponentsRegistry from '@/components-registry';

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
        const currentLiveComponent = this.$refs.container.firstChild;
        this.destroyComponentByUUID(this.getWidgetUUID($(currentLiveComponent)));
        this.$refs.container.removeChild(currentLiveComponent);
      }

      if (newVal) {
        const componentInstance = this.instantiateComponent({ type: newVal.type, props: newVal })
        this.renderWidget(this.$refs.container, componentInstance);
      }
    }
  },
  methods: {
    instantiateComponent({ type, props = {} } = {}) {
      const componentInstance = WidgetFactoryMap.config[type](props, this.$store);
      ComponentsRegistry[componentInstance.uuid] = componentInstance;
      return componentInstance;
    },
    renderWidget(target, componentInstance) {
      // set a unique uuid to every component so it is easier to identify the vue component instance
      $(componentInstance.$el).attr('lc-uuid', componentInstance.uuid);
      target.appendChild(componentInstance.$el);
    },
    destroyComponentByUUID(uuid) {
      if (!ComponentsRegistry[uuid]) {
        return;
      }

      ComponentsRegistry[uuid].$destroy();
      delete ComponentsRegistry[uuid];
    },
    getWidgetUUID(element) {
      // In order to identify an instance of a widget, it must contain the attribute
      // "lc-uuid" with its name
      return $(element).attr('lc-uuid');
    },
  }
}
</script>
<style lang="less" scoped>

</style>
