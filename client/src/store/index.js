import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginUser: {
      userName: '',
      userId: null,
    },
    isAuthenticated: false,
    todoList: [],
    targetTodo: {
      title: '',
      content: '',
    },
  },
  getters: {
    loginUser: (state) => state.loginUser,
    isAuthenticated: (state) => state.isAuthenticated,
    todoList: (state) => state.todoList,
    updateTitle: (state) => state.targetTodo.title,
    updateContent: (state) => state.targetTodo.content,
    todosNum: (state) => { return state.todoList.length; },
    completedNum: (state) => {
      let completed = 0;
      for (let i = 0; state.todoList.length > i; i++) {
        if (state.todoList[i].isCompleted === 1) {
          completed++;
        } else {
          continue;
        }
      }
      return completed;
    },
  },
  mutations: {
    updateLoginUser(state, user) {
      state.loginUser = user;
    },
    resetLoginUser(state) {
      state.loginUser = {
        userName: '',
        userId: null,
      };
    },
    updateIsAuthenticated(state, payload) {
      state.isAuthenticated = payload;
    },
    updateTodoList(state, todoList) {
      state.todoList = todoList;
    },
    // editedTodo(state, payload) {
    //   state.targetTodo = Object.assign(
    //     {},
    //     { ...state.targetTodo },
    //     {
    //       title: payload.title,
    //       contet: payload.content
    //     }
    //   );
    //   console.log(state.targetTodo);
    // },
  },
  actions: {
    async updateLoginUser({ commit }, param) {
      const res = await axios
        .post(`${BASE_URL}/login`, param)
        .then((resp) => resp)
        .catch((err) => err.response);

      if (res.status === 200) {
        commit('updateLoginUser', res.data);
        commit('updateIsAuthenticated', true);
      } else {
        commit('resetLoginUser');
        commit('updateIsAuthenticated', false);
      }
    },
    async logout({ commit }) {
      await axios.post(`${BASE_URL}/logout`);
      commit('resetLoginUser');
      commit('updateIsAuthenticated', false);
    },
    async checkAuthenticated({ commit }) {
      const res = await axios
        .get(`${BASE_URL}/user`)
        .then((resp) => resp)
        .catch((err) => err.response);

      if (res.status === 200) {
        commit('updateLoginUser', res.data.user);
        commit('updateIsAuthenticated', true);
      } else {
        commit('resetLoginUser');
        commit('updateIsAuthenticated', false);
      }
    },
    async updateTodoList({ commit }) {
      const todoList = await axios
        .get(`${BASE_URL}/todo`)
        .then((res) => res.data);
      commit('updateTodoList', todoList);
    },
    async updateTodo({ dispatch }, todo) {
      await axios.put(`${BASE_URL}/todo/${todo.id}`, todo);
      dispatch('updateTodoList');
    },
    editTitle({ commit }, title) {
      commit({
        type: 'editedTitle',
        title,
      });
    },
    // async addTodo() {
    //   await axios.post(`${BASE_URL}/todo`)
    //     .then((res) => res.data);
    //   // commit({
    //   //   type: 'editedTodo',
    //   //   title,
    //   // });
    // },
    async deleteTodo({ dispatch }, todoId) {
      console.log('dnaiowngvogencal', todoId);
      await axios.delete(`${BASE_URL}/todo/${todoId}`, todoId)
        .then(() => {
          dispatch('updateTodoList');
        });
    },
  },
});
