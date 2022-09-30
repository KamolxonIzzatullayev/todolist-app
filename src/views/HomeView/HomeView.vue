<template>
  <div class="home">
    <div class="container">
      <div class="home-header d-flex justify-content-end">
        <button
          type="button"
          class="btn btn-primary my-3 d-flex align-items-center"
          @click="$router.push('/adding')"
        >
          <AddIcon></AddIcon>
          <span class="ms-1">Add Todo</span>
        </button>
      </div>
      <TodosList :data="todos"></TodosList>
    </div>
  </div>
</template>

<script>
import TodosList from "@/components/Layout/TodosList/TodosList.vue";
import AddIcon from "../../components/Custom/AddIcon.vue";
export default {
  name: "HomeView",
  components: { TodosList, AddIcon },
  computed: {
    todos() {
      return this.$store.getters.getTodos;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./HomeView.style.scss";
</style>
