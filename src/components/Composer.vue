<template>
  <div id="composer" class="row">
    <div id="apps-container" class="copy-target" @click="selectApp"></div>
    <div class="table-container">
      <table-generator
        :rows="rows"
        :columns="columns"
        @table-changed="onTableChange"
        @row-added="addGridRow"
        @row-deleted="deleteGridRow"
        @column-added="addGridColumn"
        @column-deleted="deleteGridColumn"
        @cell-clicked="onCellClick"
        ></table-generator>
    </div>
    <div id="delete-area" class="copy-target text-center">Delete</div>
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
    ...mapGetters(['rows', 'columns', 'contentByCellId', 'appByNamespace'])
  },
  methods: {
    ...mapMutations([
      'setGrid',
      'setSelectedWidget',
      'addGridRow',
      'deleteGridRow',
      'addGridColumn',
      'deleteGridColumn'
    ]),
    onTableChange (d) {
      this.setGrid(d);
    },
    onCellClick(cellId) {
      const { content } = this.contentByCellId(cellId);
      this.setSelectedWidget(content);
    },
    selectApp({target}) {
      if (target.id === 'apps-container') {
        return this.setSelectedWidget(undefined);
      }

      const isApp = $(target).attr('lc-widget');
      const namespace = $(isApp ? target : this.getAppWidget(target)).attr('lc-namespace');

      this.setSelectedWidget(this.appByNamespace(namespace));
    },
    getAppWidget(element) {
      const isApp = $(element).attr('lc-widget');

      if (!isApp) {
        return this.getAppWidget($(element).parent());
      }

      return element[0];
    }
  }
}
</script>
<style lang="less" scoped>
#composer {
  background-color: #fff;

  .table-container {
    background-color: #000;
    margin: 0px auto;
    width: 400px;
    height: 600px;
  }

  #apps-container {
    border: 2px dotted blue;
    margin: 0px auto;
    width: 400px;
    height: 50px;
    width: 100%;
  }

  #delete-area {
    border: 2px dotted blue;
    margin: 0px auto;
    width: 400px;
    height: 50px;
    width: 100%;
  }
}
</style>

