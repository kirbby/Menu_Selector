<template>
<div id="not-found">
    <h1>404</h1>
    <h2>Diese Seite existiert leider nicht</h2>
    <router-link class="button" to="/">Zurück zur Startseite</router-link>
</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    setup() {
        return {

        };
    }
});
</script>

<style scoped lang="postcss">
#not-found {
    @apply h-full flex flex-col justify-center items-center self-center space-y-4 -mt-10;
}

h1 {
    @apply text-5xl;
}
</style>
