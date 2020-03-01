<template>
  <div class="container">
    <SignIn />
  </div>
</template>

<script>
import SignIn from '~/components/SignIn.vue';

export default {
  middleware: 'authenticated',

  components: {
    SignIn
  },
  
}

</script>

<style>


</style>
