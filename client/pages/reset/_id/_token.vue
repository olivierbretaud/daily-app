<template>
  <v-row justify="center" class="pa-5">
    <v-col
      class="slide-in-bottom"
      cols="12"
      sm="8"
      md="5"
      lg="3"
      xl="3"
      align="center"
      justify="center"
      v-if="!passwordChange"
      >
      
      <h1 class="ma-6">Change your password</h1>

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
            Submit
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
      v-if="passwordChange"
      class="slide-in-bottom">
      
      <v-icon
        x-large
        color="success">
        mdi-lock
      </v-icon>

      <h1 class="ma-6 text-center">
        Your password <br/>
        has been change
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
    password: { required },
  },

  data() {
    return {
      error: null,
      password: '',
      showPassword: false,
      passwordChange: false
    }
  },

  mounted(){
    this.$store.dispatch('resetAuthErrors');
  },

  computed: {

    ...mapState({
      message: state => state.message,
    }),

    showError: function () {
      return this.error || this.$store.state.error;
    },

    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required')
      return errors
    },
  
  },

  watch: {
    message: function (val) {
      if(val === "Password changed accepted") this.passwordChange = true;
    }
  },
  
  methods:{

    submit: function(e) {
      e.preventDefault();
      this.$v.$touch();
      this.error = null
      this.$store.dispatch('resetAuthErrors');

      if (this.$v.$invalid) {
        return;
      }

      this.$store.dispatch('resetPassword' , {
        password : this.password,
        _id: this.$route.params.id,
        token : this.$route.params.token
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

