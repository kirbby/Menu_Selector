<template>
<UserProfile class="profile-component" v-if="currentUserData" />
<router-view class="router-view" v-if="currentUserData"></router-view>
<AuthenticationForm v-else />
<div class="version">v{{ version }}</div>
</template>

<script lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent, registerRuntimeCompiler, watch } from "vue";
import { useGuestStore } from "./stores/GuestStore";
import UserProfile from "@/components/UserProfile.vue";
import AuthenticationForm from "@/components/AuthenticationForm.vue";
import { useUserStore } from "./stores/UserStore";
import supabase from "./supabaseClient";
import { upsertUserProject } from "./interfaces/userRest";

export default defineComponent({
    components: {
        UserProfile,
        AuthenticationForm,
    },
    setup() {
        const guestStore = useGuestStore();
        const userStore = useUserStore();
        const { getCurrentGuest: currentGuest } = storeToRefs(guestStore);
        const { getCurrentUserData: currentUserData, getCurrentUser: currentUser } = storeToRefs(userStore);
        const version = APP_VERSION;

        saveProjectIdToStore();

        userStore.currentUserData = supabase.auth.user();

        supabase.auth.onAuthStateChange((_, session) => {
            userStore.currentUserData = session?.user ?? null;
        });

        watch(() => currentUserData.value, function () {
            const userId = currentUserData.value?.id;

            if (userId) {
                guestStore.loadCurrentUserGuests();
                (async () => {
                    if (userStore.projectId) {
                        await upsertUserProject(userId, userStore.projectId);
                        userStore.resetProjectId();
                    }
                    userStore.loadCurrentUser();
                })();
            }
        });

        function saveProjectIdToStore() {
            const hashUrl = window.location.hash;

            if (!hashUrl) {
                return;
            }

            const hashArray = hashUrl.split("?");
            let urlParams;

            if (hashArray.length > 1) {
                urlParams = new URLSearchParams(hashArray[1]);
                userStore.projectId = urlParams.get("projectId") ?? "";
            }
        }

        return {
            currentGuest,
            currentUserData,
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

.router-view {
    @apply flex-1 overflow-hidden;
}

.version {
    @apply w-fit fixed bottom-0 bg-gray-900 px-2 flex justify-start rounded-t text-sm;
}
</style>
