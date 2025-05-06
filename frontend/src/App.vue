<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div>
    <header>
      <nav>
        <RouterLink to="/" class="btn btn-outline-success m-2">Home</RouterLink>
        <RouterLink to="/about" class="btn btn-outline-primary">About</RouterLink>
      </nav>
    </header>
    <RouterView />
  </div>
</template>

<style scoped></style>
