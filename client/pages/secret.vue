<template>
  <div class="container">
    <div>
      <h1 v-if="user">
        Welcome {{ user.name }}
      </h1>
      <button
        @click="logout"
        class="fancy-button pop-onhover bg-gradient1"
        >
        <span>Logout</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { API_URL } from '../store/index';

export default {
  middleware: 'notAuthenticated',

  mounted(){
    this.getMe();
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
    getMe() {
      this.$store.dispatch('user/getUser')
    }
  },
}
</script>