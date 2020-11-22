<template>
  <v-row justify="center" class="slide-in-bottom">
    <v-col
      align="center"
      cols="12" sm="8" md="8" lg="5"
      >
      <AddTask :addTaskToggle="addTaskToggle" v-if="addTask"/>
      <v-btn
        rounded
        x-large
        v-if="!addTask"
        @click="addTaskToggle"
        color="primary">
       add a task
      </v-btn>

      <ul v-if="tasksList">
        <li v-for="task in tasksList" :key="task._id"><Task   :task="task"/></li>
      </ul>

    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex';
import AddTask from '../components/Tasks/AddTask';
import Task from '../components/Tasks/Task';
import { API_URL } from '../store/index';

export default {
  middleware: 'notAuthenticated',

  components: {
    AddTask,
    Task
  },

  data() {
    return {
      error: null,
      addTask: false,
      tasks: null
    }
  },


  mounted(){
    this.getProfile();
  },

  computed: {
    ...mapState({
      tasksList: state => state.tasks.tasksList,
      user: state => state.user.user
    }) 
  },

  watch: {
    user:function (user) {
      if (user._id) {
        this.$store.dispatch('tasks/getTasksList' , user._id )
      }
    },
  },

  methods: {

    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/')
    },

    addTaskToggle() {
      this.addTask = !this.addTask
    },

    getProfile() {
      this.$store.dispatch('user/getUser')
    }

  },
}
</script>

<style lang="scss" scoped>
  .v-application ul {
    margin-top: 30px;
    padding-left: 0px;
  }
</style>