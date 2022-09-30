import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    todos: [],
  },
  getters: {
    getTodos: (state) => state.todos,
  },
  mutations: {
    SET_TODOS: (state, payload) => state.todos = payload
  },
  actions: {
    async getTodos(context) {
      try {
        const res = await axios.get('http://localhost:3000/todos')
        context.commit('SET_TODOS', res.data)
      } catch (error) {
        console.log(error);
      }
    }
  },
  modules: {
  }
})
