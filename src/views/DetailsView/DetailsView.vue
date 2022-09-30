<template>
  <div class="v-detail py-3">
    <div class="container">
      <div class="detail">
        <div class="detail-title">
          <h1 class="detail-title__text">Details of Todo</h1>
        </div>
        <div
          class="detail-body d-flex justify-content-between px-3 align-items-center"
        >
          <div class="detail-body__id">
            {{ todo.id }}
          </div>
          <div class="detail-body__name">
            <span v-if="!changed">{{ todo.name }}</span>
            <input v-else type="text" v-model="changingTodo.name" />
          </div>
          <div class="detail-body__action">
            <button
              v-if="!changed"
              type="button"
              class="btn btn-danger me-3"
              data-bs-toggle="modal"
              data-bs-target="#delete"
            >
              <DeleteIcon></DeleteIcon>
            </button>
            <button v-if="!changed" type="button" class="btn btn-info">
              <EditIcon @click="editTodo"></EditIcon>
            </button>

            <button
              v-if="changed"
              type="button"
              class="btn btn-danger me-3"
              @click="(changed = false), $router.go(0)"
            >
              <RemoveIcon></RemoveIcon>
            </button>

            <button
              v-if="changed"
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#edit"
            >
              <DoneIcon></DoneIcon>
            </button>

            <div
              class="modal fade"
              id="edit"
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
                      @click="editSaveTodo"
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="modal fade"
              id="delete"
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
                      @click="deleteTodo"
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
import EditIcon from "../../components/Custom/EditIcon.vue";
import DeleteIcon from "../../components/Custom/DeleteIcon.vue";
import DoneIcon from "@/components/Custom/DoneIcon.vue";
import axios from "axios";
import RemoveIcon from "@/components/Custom/RemoveIcon.vue";
export default {
  data() {
    return {
      changed: false,
      changingTodo: {},
    };
  },
  computed: {
    todo() {
      const todos = this.$store.getters.getTodos;
      let todo = {};
      todos.forEach((element) => {
        if (element.id == this.$route.params.id) {
          todo = element;
        }
      });
      return todo;
    },
  },
  methods: {
    editTodo() {
      this.changingTodo = this.todo;
      this.changed = true;
    },

    editSaveTodo() {
      try {
        const article = {
          id: this.changingTodo.id,
          name: this.changingTodo.name,
          done: true,
        };
        axios.put(
          `http://localhost:3000/todos/${this.changingTodo.id}`,
          article
        );
        this.$router.go(0);
      } catch (error) {
        console.log(error);
      }
    },

    async deleteTodo() {
      try {
        this.changingTodo = this.todo;
        axios.delete(`http://localhost:3000/todos/${this.changingTodo.id}`);
        await this.$router.push("/");
        this.$router.go(0);
      } catch (error) {
        console.log(error);
      }
    },
  },
  components: { EditIcon, DeleteIcon, DoneIcon, RemoveIcon },
};
</script>
<style lang="scss" scoped>
@import "./Details.style.scss";
</style>
