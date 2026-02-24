<script setup>
import MyBooks from '../components/MyBooks.vue'
</script>

<template>
  <div class="mybooks">
    <MyBooks />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
