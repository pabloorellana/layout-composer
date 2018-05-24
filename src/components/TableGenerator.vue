<template>
  <table id="table">
    <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
        <td @click="selectCell" class="copy-target cell" :id="rowIndex.toString() + columnIndex.toString()"
          v-for="(column, columnIndex) in columns" :key="columnIndex">
        </td>
    </tr>
  </table>
</template>
<script>
const propDefinition = {
  default: 1,
  validator (value) {
    return +value >= 1
  }
};

export default {
  name: 'TableGenerator',
  props: {
    rows: propDefinition,
    columns: propDefinition
  },
  mounted () {
    this.$emit('table-changed', this.serializeToJson())
  },
  methods: {
    serializeToJson() {
      const table = document.getElementById("table");

      return Array.from(table.rows).map(row => {
        return Array.from(row.cells).map(({id, colSpan, rowSpan}) => ({
          id,
          colSpan,
          rowSpan
        }));
      });
    },
    selectCell(arg) {
      const cellWasClicked = $(arg.target).hasClass('cell');

      if (!cellWasClicked) {
        const [clickedCell] = $(arg.target).parent();

        return this.$emit('cell-clicked', clickedCell.id)
      }

      this.$emit('cell-clicked', arg.target.id)
    }
  },
  watch: {
    rows(newVal, oldVal) {
      setTimeout(() => {
        const newRow = Array(this.columns).fill(0).map((column, index) => ({
          id: oldVal + index.toString(),
          colSpan: 1,
          rowSpan: 1
        }));

        this.$emit('row-added', newRow);
      });
    },
    columns(newVal, oldVal) {
      setTimeout(() => {
        const newColumn = Array(this.rows).fill(0).map((row, index) => ({
          id: index.toString() + oldVal,
          colSpan: 1,
          rowSpan: 1
        }));

        this.$emit('column-added', newColumn);
      });
    }
  }
}
</script>
<style lang="less" scoped>
table {
  border-collapse: collapse;
  width:100%;
  height:100%;
  table-layout: fixed;
}

table, th, td {
  border: 1px dotted #ccc;
}

.cell {
  padding: 5px;
}
</style>

