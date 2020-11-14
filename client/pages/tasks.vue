<template>
  <v-row justify="center" class="slide-in-bottom">
    <v-col
      align="center"
      cols="12" sm="8" md="5" lg="3" xl="3"
      >
      <v-btn
        rounded
        x-large
        color="primary">
       add a task
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex';
import { API_URL } from '../store/index';

export default {
  middleware: 'notAuthenticated',

  mounted(){
    this.getProfile();
  },

  computed: {
    ...mapState({
      auth: state => state.auth,
      user: state => state.user.user
    }) 
  },

  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/')
    },
    getProfile() {
      this.$store.dispatch('user/getUser')
    }
  },
}
</script>