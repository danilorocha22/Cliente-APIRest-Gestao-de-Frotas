<template>
  <div class="home">
    <div class="card">
      <img alt="Vue logo" src="../assets/logo.png">
      <SejaBemVindo msg="Seja bem vindo!"/>
    </div>
  </div>
</template>

<script>
// @ é um alias para /src
import SejaBemVindo from '@/components/SejaBemVindo.vue'

export default {
  name: 'Home',
  components: {
    SejaBemVindo
  }
}
</script>

<style scoped>
  .card {
    margin: 40px auto 2rem auto;
    display: block;
    padding: 1.2rem 2rem 0 2rem;
  }

  
</style>
