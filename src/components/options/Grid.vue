<template>
  <div class="grid-options">
    <div class="form-group">
      <label for="height">Height</label>
      <input id="height" class="form-control" type="number" v-model="rows">
    </div>
    <div class="form-group">
      <label for="width">Width</label>
      <input id="width" class="form-control" type="number" v-model="columns">
    </div>
    <router-link to="/preview">Preview</router-link>
  </div>
</template>
<script>
export default {
  computed: {
    rows: {
      get() {
        return this.$store.getters.rows;
      },
      set(value) {
        this.$store.commit('setRows', +value);
      }
    },
    columns: {
      get() {
        return this.$store.getters.columns;
      },
      set(value) {
        this.$store.commit('setColumns', +value);
      }
    },
  }
}
</script>
<style lang="less" scoped>

</style>
