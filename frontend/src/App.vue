<template>
<HomePage></HomePage>
</template>

<script setup lang="ts">
import HomePage from "./views/HomePage.vue";
</script>

<style lang="postcss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: white;
    margin-top: 60px;
}

body {
    @apply bg-gray-900;
}
</style>
