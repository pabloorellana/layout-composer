<template>
  <div id="composer" class="row">
    <div class="table-container">
      <table-generator
        :rows="rows"
        :columns="columns"
        @table-changed="onTableChange"
        @row-added="onRowAddition"
        @row-deleted="onRowDeletion"
        @column-added="onColumnAdition"
        @column-deleted="onColumnDeletion"
        @cell-clicked="onCellClick"
        ></table-generator>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import TableGenerator from "@/components/TableGenerator";

export default {
  components: {
    TableGenerator
  },
  computed: {
    ...mapGetters(['rows', 'columns', 'contentByCellId'])
  },
  methods: {
    onTableChange (d) {
      this.setGrid(d);
    },
    onCellClick(cellId) {
      const { content } = this.contentByCellId(cellId);
      this.setSelectedWidget(content);
    },
    ...mapMutations(['setGrid', 'setSelectedWidget']),
    ...mapMutations({
      onRowAddition: 'addGridRow',
      onRowDeletion: 'deleteGridRow',
      onColumnAdition: 'addGridColumn',
      onColumnDeletion: 'deleteGridColumn'
    })
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

