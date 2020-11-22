<template>
  <v-card
    class="ma-2 rounded-lg slide-in-top"
    elevation="5"
    >
    <v-card-title class="d-flex justify-space-between align-start">

      <div class="d-flex align-center title">
        <v-btn
          @click="doneToggle"
          fab
          x-small
          :color="task.isDone ? 'success' : 'secondary'"
          class="mr-2"
          >
          <v-icon>
            mdi-check
          </v-icon>
        </v-btn>
        <p>{{ task.title }}</p>
      </div>

      <div>
        <v-btn
          icon
          @click="isEditToggle"
          class="ml-2"
          >
          <v-icon v-if="!isEdit">
            mdi-pen
          </v-icon>
          <v-icon v-if="isEdit">
            mdi-close
          </v-icon>
        </v-btn>
      </div>
    </v-card-title>

    <v-card-text
      v-if="isEdit"
      class="pl-4 pr-4 pb-0">
  
      <v-text-field
        label="Title"
        outlined
        v-model="title"
        >
      </v-text-field>

      <v-textarea
      color="primary"
      outlined
      v-model="description"
      label="Descrption"
      ></v-textarea>



    </v-card-text>
    <v-card-actions
      v-if="isEdit"
      class="pb-6 pl-4 pr-4 d-flex justify-space-between">
        <v-btn
          width="140px"
          color="error"
          rounded
          @click="deleteTask"
        >
          Delete
        </v-btn>
        <v-btn
          width="140px"
          color="success"
          rounded
          @click="submit"
        >
          Save
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
export default {
  props: {
    task: Object
  },

  data() {
    return {
      isEdit: false,
      title: this.task.title,
      description: this.task.description,
    }
  },

  methods: {
    isEditToggle: function() {
      this.isEdit = !this.isEdit
    },
    doneToggle: function() {
      this.$store.dispatch('tasks/updateTask' , {
          isDone : !this.task.isDone,
          _id: this.task._id
      });
    },
    deleteTask: function() {
      this.$store.dispatch('tasks/deleteTask' , this.task._id );
    },
    submit: function() {
      this.$store.dispatch('tasks/updateTask' , {
          title: this.title,
          description: this.description,
          _id: this.task._id
      });
    }  
  },

}
</script>

<style lang="scss" scope>
  .v-application p {
    margin-bottom: 0px;
  }
  .title {
    max-width: 70%;
    text-align: left;
    p {
      font-size: 1.1rem;
    }
  }
</style>