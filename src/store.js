import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    layout: [{
      id: 'lay1',
      backgroundColor: '#000',
      grid: []
    }],
    selectedWidget: undefined,
  },
  getters: {
    layout: state => state.layout,
    grid: state => state.layout.grid,
    selectedWidget: state => state.selectedWidget,
    contentByCellId: state => (cellId) => getCell(state.layout.grid, cellId)
  },
  mutations: {
    setGrid: (state, payload) => state.layout.grid = payload,
    setContent: (state, { targetId, content }) => {
      const cell = getCell(state.layout.grid, targetId);
      if (cell.hasOwnProperty('content') && Array.isArray(cell.content)) {
        return cell.content.push(content);
      }
      cell.content = [content];
    },
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