<template>
  <div>
    <my-navi />
    <template>
      <my-add-todo-form
        :update-title="updateTitle"
        :update-content="updateContent"
        @target-title="targetTitle"
        @target-content="targetContent"
        @addTodo="addTodo"
      />
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
      'getTitle',
      'getContent',
    ]),
    updateTitle() {
      const { title } = this.getTitle;
      return title;
    },
    updateContent() {
      const { content } = this.getContent;
      return content;
    },
  },
  methods: {
    ...mapActions([
      'updateTodo',
    ]),
    ...mapActions({
      getTodoList: 'updateTodoList',
    }),
    ...mapActions([
      'addTodo',
      'editTitle',
      'editContent',
    ]),
    targetTitle($event) {
      this.editTitle($event.target.value);
    },
    targetContent($event) {
      this.editContent($event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  list-style: none;
  padding: initial;
}
</style>
