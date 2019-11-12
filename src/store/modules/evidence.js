// state
const state = {
  fileList: null
}

// getters
const getters = {
  fileList: state => state.fileList
}

// actions
const actions = {
  fileList({ commit, state }, obj) {
    commit('fileList', obj)
  }
}

// mutations
const mutations = {
  // data 载荷
  fileList(state, data) {
    let idArr = []
    data.forEach(d => {
      let id = Math.ceil(Math.random() * 1000000000)
      if (idArr.indexOf(id) !== -1) {
        id = Math.ceil(Math.random() * 1000000000)
      }
      // d.id = id
    })

    state.fileList = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
