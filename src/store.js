import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedPB: {
      value: null,
      selected: false,
    },
    selectedData: [],
    tableData: []
  },
  mutations: {
    SET_SELECTED_PB(state, newPB){
      state.selectedPB = newPB;
    }
  },
  actions: {
    
  }
})
