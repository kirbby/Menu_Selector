<template>
<div class="container" style="padding: 50px 0 100px 0">
    <div v-if="userStore.currentUser">
        <UserProfile />
        <HomePage></HomePage>
    </div>
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
        const { getActiveGuest: activeGuest } = storeToRefs(guestStore);

        userStore.currentUser = supabase.auth.user();
        supabase.auth.onAuthStateChange((_, session) => {
            userStore.currentUser = session?.user ?? null;
        });

        return {
            saveMenu,
            activeGuest,
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
    text-align: center;
    color: white;
    margin-top: 60px;
    margin-bottom: 60px;
}

body {
    @apply bg-gray-900;
}
</style>
