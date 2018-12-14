<template>
  <div class="app">
    <Task
      v-for="io in tasks"
      :key="io.id"
      :id="io.id.toString()"
      :updateTask="updateTask"
      :deleteTask="deleteTask"
      :content="io.content"
      :isDone="io.isDone"
    />
  </div>
</template>

<script>
  import Task from './components/Task';

  export default {
    name: "App",
    components: {
      Task
    },
    data: () => ({
      tasks: [
        {
          id: 0,
          isDone: false,
          content: "Setup",
        }
      ]
    }),
    methods: {
      updateTask({ id: a, content: b, isDone: c }) {
        let d = this.tasks.find(({ id }) => id == a);
        d.content = b;
        d.isDone = c;
      },
      deleteTask(a) {
        this.tasks.splice(this.tasks.findIndex(({ id }) => id === a), 1);
      }
    }
  }
</script>

<style>
  @import './styles/App.css';
</style>
