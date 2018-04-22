<template>
  <table id="table">
    <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
        <td class="copy-target" :id="rowIndex.toString() + columnIndex.toString()"
          v-for="(column, columnIndex) in columns" :key="columnIndex">
        </td>
    </tr>
  </table>
</template>
<script>
const propDefinition = {
  type: Number,
  default: 1,
  validator (value) {
    return value >= 1
  }
};

export default {
  name: 'TableGenerator',
  props: {
    rows: propDefinition,
    columns: propDefinition
  },
  methods: {
    serializeToJson () {
      const table = document.getElementById("table");
      
      return Array.from(table.rows).map(row => {
        return Array.from(row.cells).map(({id, colSpan, rowSpan}) => ({
          id,
          colSpan,
          rowSpan
        }));
      });
    }
  },
  mounted () {
    this.$emit('table-changed', this.serializeToJson())
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
</style>

