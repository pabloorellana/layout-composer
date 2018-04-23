<template>
  <div id="options">
    <grid></grid>
    <div ref="container"></div>
  </div>
</template>
<script>
import Grid from '@/components/options/Grid';
import ComponentFactoryMap from '@/components/options/ComponentFactoryMap';

export default {
  components: {
    Grid
  },
  computed: {
    selectedWidget() {
      return this.$store.getters.selectedWidget
    }
  },
  watch: {
    selectedWidget(newVal, oldVal) {
      while (this.$refs.container.firstChild) {
        this.$refs.container.removeChild(this.$refs.container.firstChild);
      }
      if (newVal) {
        const componentInstance = ComponentFactoryMap[newVal.type]();
        this.$refs.container.appendChild(componentInstance.$el);
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
