<template>
  <v-row justify="center" class="pa-5 slide-in-bottom">
    <v-col cols="12" sm="8" md="5" lg="3" xl="3" align="center" justify="center" v-if="!userCreated">
      <h1 class="ma-6">Sign In</h1>

      <v-alert
        dense
        text
        v-if="showError"
        type="error"
        class="text-left"
      >
        {{ loginError }}
      </v-alert>

      <form>

        <v-text-field
          v-model="lastName"
          :error-messages="lastNameErrors"
          placeholder="Last name"
          required
          rounded
          filled
          prepend-inner-icon="mdi-account-check"
          @blur="$v.lastName.$touch()"
        >
        </v-text-field>

        <v-text-field
          v-model="firstName"
          :error-messages="firstNameErrors"
          placeholder="First name"
          required
          rounded
          filled
          prepend-inner-icon="mdi-account-check"
          @blur="$v.firstName.$touch()"
        >
        </v-text-field>
        
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
          @blur="$v.password.$touch()"
        >
        </v-text-field>

        <v-text-field
          v-model="passwordConfirm"
          :error-messages="passwordConfirmErrors"
          :append-icon="showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPasswordConfirm ? 'text' : 'password'"
          placeholder="Confirm assword"
          required
          rounded
          filled
          prepend-inner-icon="mdi-lock"
          @click:append="showPasswordConfirm = !showPasswordConfirm"
          @input="$v.passwordConfirm.$touch()"
          @blur="$v.passwordConfirm.$touch()"
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
            <v-icon dark left >
              mdi-account-check
            </v-icon>
            Sign in
          </v-btn>

          <nuxt-link to="/">
            <v-btn
              color="primary"
              class="btn-login white--text ma-4"
              rounded
              x-large
              >
              <v-icon dark left >
                mdi-arrow-left
              </v-icon>
              Back to login
            </v-btn>
          </nuxt-link>
        </div>
      
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
      v-if="userCreated"
      class="slide-in-bottom">
      
      <v-icon
        x-large
        color="success">
        mdi-account-check
      </v-icon>

      <h1 class="ma-6 text-center">
        Welcome {{ userCreated.firstName }}<br/>
        your account is created
      </h1>

      <nuxt-link to="/">
        <v-btn
          color="primary"
          class="btn-login white--text ma-4"
          rounded
          x-large
          >
          <v-icon dark left>
            mdi-arrow-left
          </v-icon>
          Back to login
        </v-btn>
      </nuxt-link>
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
    lastName: { required },
    firstName: { required },
    password: { required },
    passwordConfirm: { required },
    email: { required, email }
  },

  data() {
    return {
      lastName: '',
      firstName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      showPassword: false,
      showPasswordConfirm: false,
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
      loginError: state => state.error
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

    firstNameErrors () {
      const errors = []
      if (!this.$v.firstName.$dirty) return errors
      !this.$v.firstName.required && errors.push('First name is required')
      return errors
    },

    lastNameErrors () {
      const errors = []
      if (!this.$v.lastName.$dirty) return errors
      !this.$v.lastName.required && errors.push('Last name is required')
      return errors
    },

    passwordConfirmErrors () {
      const errors = []

      if (!this.$v.passwordConfirm.$dirty) return errors
      !this.$v.passwordConfirm.required && errors.push('Password confirm is required')
      return errors
    },

    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required')
      return errors
    },
  
  },
  
  methods:{

    submit: function (e) {
      e.preventDefault();
      this.$store.dispatch('resetAuthErrors');

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.$store.dispatch('signIn' , {
        lastName : this.lastName,
        firstName : this.firstName,
        email : this.email,
        password : this.password,
        passwordConfirm : this.passwordConfirm
      });
    }
  }
}

</script>

<style lang="scss" scoped>

  .login-container {
    @include animation-y(slide-in-bottom, 0.5s,  40px , 0 )
  }

</style>

