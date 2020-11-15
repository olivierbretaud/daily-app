<template>
  <v-card
    class="ma-2 pa-3 rounded-lg slide-in-top"
    elevation="14"
  > 
    <v-row justify="end">
      <v-btn
        text
        color="primary"
        class="mr-2"
        rounded
        @click="addTaskToggle"
      >
        Close
        <v-icon
          color="primary"
          >
          mdi-close
        </v-icon>
      </v-btn>
    </v-row>
    <v-card-text class="pl-4 pr-4 pb-0">
  
      <v-text-field
        label="Title"
        outlined
        :error-messages="titleErrors"
        v-model="title"
        @blur="$v.title.$touch()"
        >
      </v-text-field>

      <v-textarea
      color="primary"
      outlined
      v-model="description"
      label="Descrption"
      ></v-textarea>

    </v-card-text>

    <v-card-actions class="pb-3 d-flex justify-center">
      <v-btn
        width="140px"
        color="success"
        rounded
        @click="submit"
      >
        Create task
      </v-btn>

    </v-card-actions>

  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    title: { required },
  },

  props: {
    addTaskToggle: Function,
  },

  data() {
    return {
      title: '',
      description: '',
    }
  },

  computed: {
    ...mapState({
      user: state => state.user.user
    }), 
    titleErrors () {
      const errors = []
      if (!this.$v.title.$dirty) return errors
      !this.$v.title.required && errors.push('title is required')
      return errors
    },
  },


  methods: {


    submit: function(e) {
      e.preventDefault();
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }

     this.$store.dispatch('tasks/createTask' , {
        title : this.title,
        description: this.description,
        user: this.user._id
      });
    }
  },

}
</script>

<style lang="scss">

</style>