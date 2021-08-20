<template>
  <div>
    <my-navi />
    <template>
      <my-add-todo-form/>
    </template>
    <template>
      <div class="list-status">
        <p>総件数: </p>
        <p>完了済み: </p>
      </div>
    </template>
    <template>
      <ul class="list">
        <my-todo-detail
          v-for="todo in todoList"
          :key="todo.id"
          :todo="todo"
          @update-completed="updateTodo(todo)"
          @update-todo="updateTodo(todo)"
          @deleteBtn="deleteTodo(todo.id)"
        />
      </ul>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import MyNavi from '@/components/Navi.vue';
import MyAddTodoForm from '@/components/AddTodoForm.vue';
import MyTodoDetail from '@/components/TodoDetail.vue';

export default {
  components: {
    MyNavi,
    MyAddTodoForm,
    MyTodoDetail,
  },
  data() {
    return {
      title: '',
      content: '',
    };
  },
  created() {
    this.getTodoList();
  },
  computed: {
    ...mapGetters([
      'todoList',
    ]),
  },
  methods: {
    ...mapActions([
      'updateTodo',
      'deleteTodo',
    ]),
    ...mapActions({
      getTodoList: 'updateTodoList',
    }),
  },
};
</script>

<style lang="scss" scoped>
.list {
  list-style: none;
  padding: initial;
}
</style>
