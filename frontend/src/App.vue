<template>
<UserProfile class="profile-component" v-if="currentUser" />
<HomePage class="homepage-component" v-if="currentUser"></HomePage>
<AuthenticationForm v-else />
<div class="version">v{{ version }}</div>
</template>

<script lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent, watch } from "vue";
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
        const version = APP_VERSION;

        userStore.currentUser = supabase.auth.user();
        supabase.auth.onAuthStateChange((_, session) => {
            userStore.currentUser = session?.user ?? null;
        });

        watch(() => currentUser.value, function () {
            if (currentUser.value?.id) {
                guestStore.loadCurrentUserGuests();
            }
        });

        return {
            currentGuest,
            currentUser,
            userStore,
            guestStore,
            version,
        };
    },
});
</script>

<style lang="postcss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    @apply text-gray-200 text-center w-screen h-screen overflow-hidden flex flex-col;
}

html,
 body {
    @apply bg-gray-900 w-screen h-screen;
}

.button {
    @apply py-2 px-5 bg-blue-500 text-gray-200 rounded-lg;
}

.profile-component {
    @apply flex;
}

.homepage-component {
    @apply flex-1 overflow-hidden;
}

.version {
    @apply w-fit fixed bottom-0 bg-gray-900 px-2 flex justify-start rounded-t text-sm;
}
</style>
