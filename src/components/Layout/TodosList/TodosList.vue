<template>
  <div class="c-l-todo py-4">
    <ul class="todo list-unstyled">
      <li
        class="todo-header d-flex justify-content-between align-items-center px-3 py-2 my-2"
      >
        <div class="todo-header__id">#</div>
        <div class="todo-header__name flex-grow-1 pe-3 me-3">Todo name</div>
        <div class="todo-header__action pe-4">Action</div>
      </li>
      <li
        class="todo-item d-flex justify-content-between align-items-center px-3 py-2 my-2 rounded"
        v-for="todoItem in todos"
        :key="todoItem.id"
        :class="todoItem.done ? 'active' : ''"
      >
        <div class="todo-item__id">{{ todoItem.id }}</div>
        <div class="todo-item__name flex-grow-1">{{ todoItem.name }}</div>
        <div class="todo-item__action">
          <button
            v-if="!todoItem.done"
            type="button"
            class="btn btn-primary me-3"
            data-bs-toggle="modal"
            :data-bs-target="`#exampleModal${todoItem.id}`"
          >
            <DoneIcon></DoneIcon>
          </button>

          <button
            v-else
            type="button"
            class="btn btn-danger me-3"
            data-bs-toggle="modal"
            :data-bs-target="`#cancelModal${todoItem.id}`"
          >
            <RemoveIcon></RemoveIcon>
          </button>

          <button type="button" class="btn btn-light">
            <EyeIcon @click="goDetails(todoItem)"></EyeIcon>
          </button>
        </div>

        <div
          class="modal fade"
          :id="`exampleModal${todoItem.id}`"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">Do you want save ?</div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  No
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                  @click="updateTodo(todoItem)"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          class="modal fade"
          :id="`cancelModal${todoItem.id}`"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">Do you want save ?</div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  No
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                  @click="cancelTodo(todoItem)"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import EyeIcon from "../../Custom/EyeIcon.vue";
import DoneIcon from "../../Custom/DoneIcon.vue";
import RemoveIcon from "../../Custom/RemoveIcon.vue";
export default {
  props: {
    data: {
      type: Object,
    },
  },
  computed: {
    todos() {
      return this.data;
    },
  },
  components: { EyeIcon, DoneIcon, RemoveIcon },
  methods: {
    updateTodo(todo) {
      try {
        const article = {
          id: todo.id,
          name: todo.name,
          done: true,
        };
        axios.put(`http://localhost:3000/todos/${todo.id}`, article);
        this.$router.go(0);
      } catch (error) {
        console.log(error);
      }
    },
    cancelTodo(todo) {
      try {
        const article = {
          id: todo.id,
          name: todo.name,
          done: false,
        };
        axios.put(`http://localhost:3000/todos/${todo.id}`, article);
        this.$router.go(0);
      } catch (error) {
        console.log(error);
      }
    },
    goDetails(todo) {
      this.$router.push(`/todos/${todo.id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./TodosList.style.scss";
</style>
