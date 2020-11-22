<template>
  <v-app-bar
    absolute
    color="white"
    elevate-on-scroll
    >

    <v-toolbar-title>
      <h2 class="primary-font-bold text-center primary--text">Daily Manager</h2>
    </v-toolbar-title>

    <v-spacer></v-spacer>


    <v-btn
      @click="logout"
      icon>
      <v-icon>mdi-login</v-icon>
    </v-btn>

  </v-app-bar>
</template>

<script>
export default {

  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss" scoped>

</style>