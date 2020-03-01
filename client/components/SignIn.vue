<template>
    <div class="login-container">
      <p class="error" v-if="showError">
        {{ loginError }}
        {{ error }}
      </P>

      <div class="input-container">
        <label class="label" for="name">Name</label>
        <input
          id="name"
          v-model="name"
          type="text"
          name="name"
        >
      </div>

      <div class="input-container">
        <label class="label" for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          name="email"
        >
      </div>

      <div class="input-container">
        <label class="label" for="password">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          name="password"
        >
      </div>

      <div class="input-container">
        <label class="label" for="password-confirm">Password confirm</label>
        <input
          id="password-confirm"
          v-model="passwordConfirm"
          type="password"
          name="password-confirm"
        >
      </div>

      <div class="btn-container">
        <button
          @click="checkForm"
          class="fancy-button pop-onhover bg-gradient1"
          >
          <span>Sign in </span>
        </button>
        <nuxt-link to="/" class="fancy-button pop-onhover bg-gradient2" >
          <span>Login</span>
        </nuxt-link>
      </div>

    </div>

</template>
<script>
import { mapState } from 'vuex';

export default {
  props: ['loginToggle'],

  data() {
    return {
      error: null,
      name: null,
      email: null,
      password: null,
      passwordConfirm: null
    }
  },

  computed: {

    ...mapState({
      userCreated: state => state.userCreated,
      loginError: state => state.error
    }),

    showError: function () {
      return this.error || this.$store.state.error;
    },
    
  },

  watch: {
    userCreated: function (val) {
      console.log(val)
      if (val) this.$router.push('/');
    }
  },
  
  methods:{
    checkForm: function (e) {
      e.preventDefault();
      this.error = null
      this.$store.dispatch('resetAuthErrors')
      if (this.email && this.password && this.password && this.passwordConfirm ) {
        return this.$store.dispatch('signIn' , {
          name : this.name,
          email : this.email,
          password : this.password,
          password_confirm : this.passwordConfirm
        });
      }

      if (!this.name) {
        this.error = ('Name required.');
      }
      if (!this.email) {
        this.error = ('Email required.');
      }
      if (this.name && this.email && !this.password) {
        this.error = ('Password required.');
      }
      if (this.name && this.email && this.password && !this.passwordConfirm) {
        this.error = ('Password confirm required.');
      }
      if (this.name && this.email && this.passwordConfirm  && this.passwordConfirm && this.passwordConfirm !== this.password) {
        this.error = ('Password and confirm password should be same.');
      }
    }
  }
}

</script>
<style lang="scss">

.btn-container {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

</style>
