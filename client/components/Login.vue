<template>
    <div class="login-container">
      <p class="error" v-if="showError">
        {{ loginError }}
        {{ error }}
      </P>

      <p class="success" v-if="userCreated">
        Your account is created
      </P>

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
      <div class="btn-container">
        <button
          @click="checkForm"
          class="fancy-button pop-onhover bg-gradient1"
          >
          <span>Login</span>
        </button>
        <nuxt-link to="/signin" class="fancy-button pop-onhover bg-gradient2" >
          <span>sign in</span>
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
      email: null,
      password: null,
    }
  },

  computed: {

    ...mapState({
      userCreated: state => state.userCreated,
      auth: state => state.auth,
      user: state => state.user.user,
      loginError: state => state.error
    }),

    showError: function () {
      return this.error || this.$store.state.error;
    },
    
  },

  watch: {
    auth: function (val) {
      console.log(val)
      if (val) this.$router.push('/secret');
    }
  },
  
  methods:{
    checkForm: function (e) {
      e.preventDefault();
      this.error = null
      this.$store.dispatch('resetAuthErrors')
      if (this.email && this.password) {
        return this.$store.dispatch('login' , {
          email : this.email,
          password : this.password
        });
      }

      if (!this.email) {
        this.error = ('Email required.');
      }
      if (!this.password) {
        this.error = ('Password required.');
      }
    }
  }
}

</script>
<style lang="scss">
// @import '../assets/styles/transitions.scss';

// .fancy-button {
//   span {
//     min-width: 140px;
//   }
// }

// .login-container {
//   width: 320px;
//   @include animation-y(slide-in-bottom, 0.5s,  40px , 0 )
// }

// .btn-container {
//     margin-top: 20px;
//   display: flex;
//   justify-content: space-between;
// }

// .error {
//   position: absolute;
//   width: 320px;
//   margin-top: -30px;
//   color:$error;
//   @include animation-y(slide-in-top, 0.2s,  -20px , 0 )
// }

</style>
