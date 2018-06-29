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
import ComponentsRegistry from '@/components-registry';

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
    selectCell({target}) {
      const isCell = $(target).hasClass('cell');

      if (!isCell) {
        const [clickedCell] = this.getParentCell(target);

        return this.$emit('cell-clicked', clickedCell.id)
      }

      this.$emit('cell-clicked', target.id)
    },
    getParentCell(element) {
      const isCell = $(element).hasClass('cell');

      if (!isCell) {
        return this.getParentCell($(element).parent());
      }

      return element;
    },
    /**
      When a row is deleted from the DOM, we should remove the vue components
      that existed in that row because they are just removed from the view but
      their instances are still alive, as they are registered in the ComponentRegistry
      they should be identified and removed from there to ensure they are not leaking
      memory and to fire correctly their "destroyed" hooks.
     */
    destroyRowElements(rowNumber) {
      const tableRow = $(`table tr:nth-child(${rowNumber})`).children();

      Array.from(tableRow).forEach(column => {
        Array.from($(column).children()).forEach(child => {
          if (!!child) {
            const uuid = $(child).attr('lc-uuid');
            if (uuid !== undefined) {
              ComponentsRegistry[uuid].$destroy();
              delete ComponentsRegistry[uuid];
            }
          }
        });
      });
    }
  },
  watch: {
    rows(newVal, oldVal) {
      if (newVal > oldVal) {
        return setTimeout(() => {
          const newRow = Array(this.columns).fill(0).map((column, index) => ({
            id: oldVal + index.toString(),
            colSpan: 1,
            rowSpan: 1
          }));

          this.$emit('row-added', newRow);
        });
      }

      this.destroyRowElements(oldVal);
      this.$emit('row-deleted');
    },
    columns(newVal, oldVal) {
      if (newVal > oldVal) {
        return setTimeout(() => {
          const newColumn = Array(this.rows).fill(0).map((row, index) => ({
            id: index.toString() + oldVal,
            colSpan: 1,
            rowSpan: 1
          }));

          this.$emit('column-added', newColumn);
        });
      }

      this.$emit('column-deleted');
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

