<template>
<form @submit.prevent="updateProfile">
    <!-- <label for="email">Email</label>
    <input id="email" class="disabled-textbox" type="text" :value="userStore.currentUser.email" disabled /> -->

    <!-- <label for="username">Name</label> -->
    <div id="username">{{ userStore.currentUser.email }}</div>

    <!--     <div>
        <input type="submit" class="button" :value="loading ? 'Loading ...' : 'Update'" :disabled="loading" />
    </div> -->

    <div>
        <button class="button" @click="signOut" :disabled="loading">
            Sign Out
        </button>
    </div>
</form>
</template>

<script lang="ts">
import supabase from "@/supabaseClient";
import { useUserStore } from "@/stores/UserStore";
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";
import User from "@/types/User";

export default {
    setup() {
        const loading = ref(true);
        const username = ref("");
        const email = ref("");
        const avatar_url = ref("");
        const userStore = useUserStore();
        const toast = useToast();

        async function getProfile() {
            try {
                loading.value = true;
                userStore.currentUser = supabase.auth.user();

                const { data, error, status } = await supabase
                    .from<User>("users")
                    .select(`username, email`)
                    .eq("id", userStore.getCurrentUser?.id)
                    .single();

                if (error && status !== 406) {
                    throw error;
                }


                if (data) {
                    username.value = data.username || "";
                    email.value = data.email || "";
                }
            } catch (error: unknown) {
                if (typeof error === "string") {
                    toast.error(error);
                } else if (error instanceof Error) {
                    toast.error(error.message);
                }
            } finally {
                loading.value = false;
            }
        }

        async function updateProfile() {

        /*     try {
                loading.value = true;
                userStore.currentUser = supabase.auth.user();

                const updates: Guests = {
                    id: userStore.getCurrentUser?.id ?? "",
                    name: username.value,
                    email: website.value,
                };

                const { error } = await supabase.from("guests").upsert(updates, {
                    returning: "minimal", // Don't return the value after inserting
                });

                if (error) {
                    throw error;
                }
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                loading.value = false;
            } */
        }

        async function signOut() {
            try {
                loading.value = true;
                const { error } = await supabase.auth.signOut();
                if (error) {
                    throw error;
                }
            } catch (error: unknown) {
                if (typeof error === "string") {
                    toast.error(error);
                } else if (error instanceof Error) {
                    toast.error(error.message);
                }
            } finally {
                loading.value = false;
            }
        }

        onMounted(() => {
            getProfile();
        });

        return {
            userStore,
            loading,
            username,
            email,
            avatar_url,

            updateProfile,
            signOut,
        };
    },
};
</script>

<style scoped lang="postcss">
form {
    @apply w-full px-2 py-1 flex flex-row items-center justify-between space-x-4 bg-blue-800/80;
}

input[type="text"] {
    @apply border border-gray-300 rounded-lg text-black/80 p-2 font-semibold;
}

label {
    @apply pr-3;
}

.button {
    @apply px-3 py-1;
}
</style>
