import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    layout: {
      id: 'lay1',
      backgroundColor: '#000',
      rows: 4,
      columns: 3,
      grid: [],
      apps: []
    },
    selectedWidget: undefined
  },
  getters: {
    layout: state => state.layout,
    rows: state => state.layout.rows,
    columns: state => state.layout.columns,
    grid: state => state.layout.grid,
    selectedWidget: state => state.selectedWidget,
    contentByCellId: state => (cellId) => getCell(state.layout.grid, cellId),
    appByNamespace: state => (namespace) => state.layout.apps.find(app => app.namespace === namespace)
  },
  mutations: {
    setGrid: (state, payload) => state.layout.grid = payload,
    setRows: (state, payload) => state.layout.rows = payload,
    setColumns: (state, payload) => state.layout.columns = payload,
    setContent: (state, { targetId, content }) => {
      const cell = getCell(state.layout.grid, targetId);
      /*if (cell.hasOwnProperty('content') && Array.isArray(cell.content)) {
        return cell.content.push(content);
      }
      cell.content = [content];*/
      cell.content = content;
    },
    deleteContent: (state, cellId) => {
      const cell = getCell(state.layout.grid, cellId);

      if (cell) {
        delete cell.content;
      }
    },
    addApp: (state, payload) => state.layout.apps.push(payload),
    addGridRow: (state, payload) => state.layout.grid.push(payload),
    addGridColumn: (state, payload) => state.layout.grid.forEach((row, index) => row.push(payload[index])),
    deleteGridRow: (state, payload) => state.layout.grid.splice(-1, 1),
    deleteGridColumn: (state, payload) => state.layout.grid.forEach((row, index) => row.splice(-1, 1)),
    moveContentFromTo: (state, { from, to }) => {
      // TODO suppor move content from one cell containing multiple widgets
      const source = getCell(state.layout.grid, from);
      const target = getCell(state.layout.grid, to);

      target.content = source.content;
      delete source.content;
    },
    setSelectedWidget: (state, widget) => state.selectedWidget = widget
  },
  actions: {

  }
})

function getCell (grid, cellId) {
  let cell = undefined;
  grid.find(row => row.find(col => {
    if (col.id === cellId) {
      cell = col;
      return true;
    }
  }));

  return cell;
}