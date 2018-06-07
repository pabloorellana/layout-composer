import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    composer: {
      id: 'layout-1',
      layout: {
        rows: 4,
        columns: 3,
        backgroundColor: '#000',
      },
      grid: [],
      apps: []
    },
    selectedWidget: undefined
  },
  getters: {
    layout: state => state.composer.layout,
    rows: state => state.composer.layout.rows,
    columns: state => state.composer.layout.columns,
    grid: state => state.composer.grid,
    selectedWidget: state => state.selectedWidget,
    contentByCellId: state => (cellId) => getCell(state.composer.grid, cellId),
    appByNamespace: state => (namespace) => state.composer.apps.find(app => app.namespace === namespace)
  },
  mutations: {
    setGrid: (state, grid) => state.composer.grid = grid,
    setRows: (state, rows) => state.composer.layout.rows = rows,
    setColumns: (state, columns) => state.composer.layout.columns = columns,
    setContent: (state, { targetId, content }) => {
      const cell = getCell(state.composer.grid, targetId);
      /*if (cell.hasOwnProperty('content') && Array.isArray(cell.content)) {
        return cell.content.push(content);
      }
      cell.content = [content];*/
      cell.content = content;
    },
    deleteContent: (state, cellId) => {
      const cell = getCell(state.composer.grid, cellId);

      if (cell) {
        delete cell.content;
      }
    },
    addApp: (state, app) => state.composer.apps.push(app),
    deleteApp(state, namespace) {
      const appIndex = state.composer.apps.findIndex(app => app.namespace === namespace);
      state.composer.apps.splice(appIndex, 1);
      try {
        this.unregisterModule(namespace);
      } catch (e) {
        // usually throws an exception when the namespace is not register or does not exist
        console.warn(e)
      }
    },
    deleteWidgetsByNamespace(state, namespace) {
      state.composer.grid.forEach(row => row.forEach(cell => {
        if (cell.content && cell.content.namespace && cell.content.namespace === namespace) {
          delete cell.content
        }
      }));
    },
    addGridRow: (state, row) => state.composer.grid.push(row),
    addGridColumn: (state, column) => state.composer.grid.forEach((row, index) => row.push(column[index])),
    deleteGridRow: (state) => state.composer.grid.splice(-1, 1),
    deleteGridColumn: (state) => state.composer.grid.forEach((row, index) => row.splice(-1, 1)),
    moveContentFromTo: (state, { from, to }) => {
      // TODO suppor move content from one cell containing multiple widgets
      const source = getCell(state.composer.grid, from);
      const target = getCell(state.composer.grid, to);

      target.content = source.content;
      delete source.content;
    },
    setSelectedWidget: (state, widget) => state.selectedWidget = widget,
    patchSelectedWidget: (state, widget) => Object.assign(state.selectedWidget, widget)
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