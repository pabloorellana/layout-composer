<template>
  <div id='preview'>
    <div class="table-container">
      <table id='app-renderer'></table>
    </div>
  </div>
</template>
<script>
import '../../node_modules/jquery.json2html/jquery.json2html';
import WidgetFactoryMap from '@/plugins/room-manager/WidgetFactoryMap';

export default {
  name: 'preview',
  components: {},
  mounted() {
    const grid = [
      [{
        'id': '00',
        'colSpan': 1,
        'rowSpan': 2,
        'content': {
          'type': 'room',
          'id': '3',
          'name': 'mizque'
        }
      }, {
        'id': '01',
        'colSpan': 2,
        'rowSpan': 1,
        'content': {
          'type': 'room',
          'id': '1',
          'name': 'punata'
        }
      }],
      [{
        'id': '002',
        'colSpan': 1,
        'rowSpan': 1,
        'content': {
          'type': 'room',
          'id': '3',
          'name': 'mizque2'
        }
      }, {
        'id': '012',
        'colSpan': 1,
        'rowSpan': 1,
        'content': {
          'type': 'room',
          'id': '1',
          'name': 'punata2'
        }
      }]
    ]
    this.renderGrid(this.$store.getters.grid);
    this.renderComponents(this.$store.getters.grid);
  },
  methods: {
    renderGrid(grid = []) {
      const transform = {
        '<>': 'tr',
        html() {
          return json2html.transform(this, {
            '<>': 'td',
            id: '${id}',
            colSpan: '${colSpan}',
            rowSpan: '${rowSpan}'
          });
        }
      };

      $('#app-renderer').json2html(grid, transform)
    },
    renderComponents(grid) {
      grid.forEach(row => {
        row.forEach(({id, content}) => {
          const [container] = $(`#${id}`);
          if (content) {
            container.appendChild(this.instantiateComponent(content));
          }
        });
      });
    },
    instantiateComponent(options) {
      const componentInstance = WidgetFactoryMap.widget[options.type](options);
      return componentInstance.$el;
    }
  }
}
</script>
<style lang='less' scoped>
#preview {
  .table-container {
    background-color: #000;
    margin: 15px auto;
    width: 400px;
    height: 600px;
  }

  table {
    border-collapse: collapse;
    width:100%;
    height:100%;
    table-layout: fixed;
  }

  table, th, td {
    border: 1px dotted #ccc;
  }
}
</style>