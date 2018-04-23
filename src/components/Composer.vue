<template>
  <div id="composer" class="row">
    <div class="table-container">
      <table-generator
        :rows="rows"
        :columns="columns"
        @table-changed="onTableChange"
        @cell-clicked="onCellClick"
        ></table-generator>
    </div>
  </div>
</template>
<script>
import TableGenerator from "@/components/TableGenerator";

export default {
  components: {
    TableGenerator
  },
  data () {
    return {
      rows: 6,
      columns: 4
    }
  },
  methods: {
    onTableChange (d) {
      this.$store.commit('setGrid', d);
    },
    onCellClick(cellId) {
      const { content } = this.$store.getters.contentByCellId(cellId);
      this.$store.commit('setSelectedWidget', content);
    }
  }
}
</script>
<style lang="less" scoped>
#composer {
  background-color: #fff;

  .table-container {
    background-color: #000;
    margin: 15px auto;
    width: 400px;
    height: 600px;
  }
}
</style>

