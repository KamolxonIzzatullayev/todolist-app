<template>
  <div class="v-adding py-3">
    <div class="container">
      <div class="detail">
        <div class="detail-title">
          <h1 class="detail-title__text">Adding a new Todo</h1>
        </div>
        <div
          class="detail-body d-flex justify-content-between px-3 align-items-center"
        >
          <div class="detail-body__id">
            {{ todoId }}
          </div>
          <div class="detail-body__name">
            <input type="text" v-model="todo.name" @input="addingTodo" />
          </div>
          <div class="detail-body__action">
            <button
              type="button"
              class="btn btn-danger me-3"
              @click="$router.push('/')"
            >
              <RemoveIcon></RemoveIcon>
            </button>

            <button
              v-if="!isError"
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#add"
            >
              <DoneIcon></DoneIcon>
            </button>

            <div
              class="modal fade"
              id="add"
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
                      @click="addSaveTodo"
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DoneIcon from "@/components/Custom/DoneIcon.vue";
// import axios from "axios";
import RemoveIcon from "@/components/Custom/RemoveIcon.vue";
import axios from "axios";
export default {
  data() {
    return {
      todo: {
        name: "",
      },
      isError: true,
    };
  },

  computed: {
    todoId() {
      const todos = this.$store.getters.getTodos;
      return todos.length + 1;
    },
  },

  methods: {
    addingTodo() {
      if (this.todo.name.trim() === "") {
        this.isError = true;
      } else {
        this.isError = false;
      }
    },
    async addSaveTodo() {
      try {
        const article = {
          id: this.todoId,
          name: this.todo.name,
          done: false,
        };
        axios.post(`http://localhost:3000/todos`, article);
        await this.$router.push("/");
        this.$router.go(0);
      } catch (error) {
        console.log(error);
      }
    },
  },
  components: { DoneIcon, RemoveIcon },
};
</script>
<style lang="scss" scoped>
@import "./AddingView.style.scss";
</style>
