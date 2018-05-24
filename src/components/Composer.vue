<template>
  <div id="composer" class="row">
    <div class="table-container">
      <table-generator
        :rows="rows"
        :columns="columns"
        @table-changed="onTableChange"
        @row-added="onRowAddition"
        @column-added="onColumnAdition"
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
  computed: {
    rows() {
      return this.$store.getters.rows;
    },
    columns() {
      return this.$store.getters.columns;
    }
  },
  methods: {
    onTableChange (d) {
      console.log('onTableChange', d)
      this.$store.commit('setGrid', d);
    },
    onRowAddition(row) {
      this.$store.commit('addGridRow', row);
    },
    onColumnAdition(column) {
      this.$store.commit('addGridColumn', column);
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

