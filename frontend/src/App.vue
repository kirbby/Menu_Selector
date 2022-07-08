<template>
<div>
    <UserProfile v-if="currentUser" />
    <HomePage v-if="currentUser"></HomePage>
    <AuthenticationForm v-else />
</div>
</template>

<script lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { saveMenu } from "./interfaces/menu";
import { useGuestStore } from "./stores/GuestStore";
import HomePage from "@/views/HomePage.vue";
import UserProfile from "@/components/UserProfile.vue";
import AuthenticationForm from "@/components/AuthenticationForm.vue";
import { useUserStore } from "./stores/UserStore";
import supabase from "./supabaseClient";

export default defineComponent({
    components: {
        UserProfile,
        HomePage,
        AuthenticationForm,
    },
    setup() {
        const guestStore = useGuestStore();
        const userStore = useUserStore();
        const { getCurrentGuest: currentGuest } = storeToRefs(guestStore);
        const { getCurrentUser: currentUser } = storeToRefs(userStore);

        userStore.currentUser = supabase.auth.user();
        supabase.auth.onAuthStateChange((_, session) => {
            userStore.currentUser = session?.user ?? null;
        });

        return {
            saveMenu,
            currentGuest,
            currentUser,
            userStore,
        };
    },
});
</script>

<style lang="postcss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */
    @apply text-white text-center h-full w-full overflow-hidden;
}

html,
 body {
    @apply bg-gray-900 w-screen h-screen;
}
</style>
