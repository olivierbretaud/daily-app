<template>
  <v-row justify="center" class="pa-5">
    <v-col class="slide-in-bottom" cols="12" sm="8" md="5" lg="3" xl="3" align="center" justify="center" v-if="!forgotMessage">
      
      <h1 class="ma-6">Login</h1>

      <v-alert
        dense
        text
        v-if="showError"
        type="error"
        class="text-left"
      >
        {{ loginError }}
        {{ error }}
      </v-alert>

      <form>
        
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          placeholder="Email"
          required
          rounded
          filled
          prepend-inner-icon="mdi-email"
          @blur="$v.email.$touch()"
        >
        </v-text-field>

        <v-text-field
          v-model="password"
          :error-messages="passwordErrors"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Password"
          required
          rounded
          filled
          prepend-inner-icon="mdi-lock"
          @click:append="showPassword = !showPassword"
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
        >
        </v-text-field>


        <div class="d-flex flex-column align-center">
          <v-btn
            color="success"
            class="btn-login white--text ma-4"
            rounded
            x-large
            @click="submit"
            >
            <v-icon
              dark
              left
            >
              mdi-account-check
            </v-icon>
            login
          </v-btn>

          <nuxt-link to="/signin">
            <v-btn
              color="primary"
              class="btn-login white--text ma-4"
              rounded
              x-large
              >
              <v-icon
                dark
                left
              >
                mdi-lead-pencil
              </v-icon>
              Sign in
            </v-btn>
          </nuxt-link>
        </div>

       <a 
        class="ma-6 greyDarken1--text forgot"
        @click="forgot"
        >Forgot password
      </a>
      
      </form>

    </v-col>

     <v-col
      cols="12"
      sm="8"
      md="5"
      lg="3"
      xl="3"
      align="center"
      justify="center"
      v-if="forgotMessage"
      class="slide-in-bottom">
      
      <v-icon
        x-large
        color="success">
        mdi-email
      </v-icon>

      <h1 class="ma-6 text-center">
        Check your email box<br/>to reset your password
      </h1>

      <v-btn
        color="primary"
        class="btn-login white--text ma-4"
        rounded
        x-large
        @click="backFromForgot"
        >
        <v-icon dark left>
          mdi-arrow-left
        </v-icon>
        Back to login
      </v-btn>
    </v-col>

  </v-row>
</template>

<script>
import { mapState } from 'vuex';
import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
  middleware: 'authenticated',
  layout: 'login',

  mixins: [validationMixin],

  validations: {
    password: { required },
    email: { required, email }
  },

  data() {
    return {
      error: null,
      email: '',
      password: '',
      showPassword: false,
    }
  },

  mounted(){
    this.$store.dispatch('resetAuthErrors');
  },

  computed: {

    ...mapState({
      userCreated: state => state.userCreated,
      auth: state => state.auth,
      user: state => state.user.user,
      loginError: state => state.error,
      forgotMessage: state => state.forgotMessage
    }),

    showError: function () {
      return this.error || this.$store.state.error;
    },

    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },

    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required')
      return errors
    },
  
  },

  watch: {
    auth: function (val) {
      console.log(val)
      if (val) {
        this.$router.push('/secret');
      }
    }
  },
  
  methods:{

    backFromForgot: function(e) {
       e.preventDefault();
       this.$store.dispatch('resetAuthErrors');
    }, 

    forgot: function(e) {
      e.preventDefault();
      this.$v.email.$touch();
      if (this.$v.email.$invalid) {
        return;
      }
      if(this.email) {
        this.$store.dispatch('forgotPassword' , {
          email : this.email,
        });
      }
    },

    submit: function(e) {
      e.preventDefault();
      this.$v.$touch();
      this.error = null
      this.$store.dispatch('resetAuthErrors');

      if (this.$v.$invalid) {
        return;
      }

      this.$store.dispatch('login' , {
        email : this.email,
        password : this.password
      });
    }
  }
}

</script>

<style lang="scss" scoped>

  .forgot {
    &:hover {
      text-decoration: underline;
    }
  }

</style>

