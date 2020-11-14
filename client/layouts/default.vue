<template>
  <v-app>
    <Nav />
    <v-main>
      <v-container class="app-container" fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Nav from '../components/Nav/Nav.vue';

export default {
  components: {
    Nav
  }
}
</script>

<style lang="scss">
  .app-container {
    margin-top: 40px;
  }
</style>
