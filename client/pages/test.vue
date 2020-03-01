<template>
  <div>
          {{ $store.state.auth }}
    <div v-if="$store.state.auth">
      <p>
        You are authenticated. You can see the
        <NuxtLink to="/secret">
          secret page
        </NuxtLink>!
      </p>
      <button @click="logout">
        Logout
      </button>
    </div>
    <p v-else>
      Please
      <NuxtLink to="/login">
        login
      </NuxtLink>.
    </p>
  </div>
</template>

<script>
const Cookie = require('js-cookie')

export default {
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>