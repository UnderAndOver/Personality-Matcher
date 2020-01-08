import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    personalityScores:{},
  },
  mutations: {
    setPersonalityScores(state,value){
      state.personalityScores=value;
    }
  },
  actions: {
  },
  modules: {
  },
  getters:{
    personalityScores:state=>state.personalityScores
  }
})
