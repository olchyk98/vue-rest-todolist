<template>
  <div class="app">
    <Task
      v-if="tasks"
      v-for="io in tasks"
      :key="io._id"
      :_id="io._id.toString()"
      :updateTask="updateTask"
      :deleteTask="deleteTask"
      :content="io.content"
      :isDone="io.isDone"
    />
    <div v-if="!tasks" class="app-loader" />
    <form v-if="tasks" class="app-new" @submit="e => { e.preventDefault(); addTask() }">
      <input ref="newInputRef" @input="({ target: { value } }) => newTask.content = value" placeholder="Start typing..." />
      <button type="submit">Submit</button>
    </form>
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
      tasks: null,
      newTask: {
        content: ""
      }
    }),
    created() {
      fetch(`http://localhost:4000/todos`, {
          method: "GET"
        }).then(a => {
          if(a.status !== 200) throw new Error("created -> API ERROR!");
          return a.json();
        }).then(data => {
          this.tasks = data.data;
        }).catch(console.err);
    },
    methods: {
      updateTask({ _id: a, content: b, isDone: c }) {
        let d = this.tasks.find(({ _id }) => _id == a);
        d.content = b;
        d.isDone = c;

        // It's just a simple example. I won't catch any API errors here (I mean, change state and other those stuff).
        fetch(`http://localhost:4000/todos/${ d._id }`, {
          method: "PUT", // update
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            content: b,
            isDone: c
          })
        }).then(a => {
          if(a.status !== 200) throw new Error("updateTask -> API ERROR!");
        }).catch(console.err);
      },
      deleteTask(a) {
        this.tasks.splice(this.tasks.findIndex(({ _id }) => _id === a), 1);
        fetch(`http://localhost:4000/todos/${ a }`, {
          method: "DELETE"
        }).then(a => {
          if(a.status !== 200) throw new Error("deleteTask -> API ERROR!");
        }).catch(console.err);
      },
      addTask() {
        if(!this.tasks) {
          throw new Error("Uhh... Looks like something is wrong with the API. Did you connect a MongoDB Database?");
        }

        let a = this.newTask.content;
        if(!a.replace(/ /g, "").length) return;
        let b = this.tasks.length;
        this.tasks.unshift({
          _id: b,
          content: a,
          isDone: false
        });

        fetch(`http://localhost:4000/todos`, {
          method: "POST", // add
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            content: a
          })
        }).then(a => {
          if(a.status !== 200) throw new Error("addTask -> API ERROR!");
          else return a.json();
        }).then(a => {
          this.tasks.find(io => io._id.toString() === b.toString())._id = a.data._id;
        }).catch(console.err);
      }
    }
  }
</script>

<style>
  @import './styles/App.css';
</style>
