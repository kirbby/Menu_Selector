<template>
<form @submit.prevent="updateProfile">
    <div class="grid grid-col-2">
        <label for="email">Email</label>
        <input id="email" class="email" type="text" :value="userStore.currentUser.email" disabled />
    </div>
    <div class="grid grid-col-2">
        <label for="username">Name</label>
        <input id="username" type="text" v-model="username" />
    </div>
    <div class="grid grid-col-2">
        <label for="website">Website</label>
        <input id="website" type="website" v-model="website" />
    </div>

    <div>
        <input type="submit" class="button" :value="loading ? 'Loading ...' : 'Update'" :disabled="loading" />
    </div>

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
import { definitions } from "@/types/supabase";

export default {
    setup() {
        const loading = ref(true);
        const username = ref("");
        const website = ref("");
        const avatar_url = ref("");
        const userStore = useUserStore();
        const toast = useToast();

        async function getProfile() {
            try {
                loading.value = true;
                userStore.currentUser = supabase.auth.user();

                const { data, error, status } = await supabase
                    .from("guests")
                    .select(`name, email`)
                    .eq("id", userStore.getCurrentUser?.id)
                    .single();

                if (error && status !== 406) {
                    throw error;
                }


                if (data) {
                    username.value = data.name;
                    website.value = data.email;
                }
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                loading.value = false;
            }
        }

        async function updateProfile() {

        /*     try {
                loading.value = true;
                userStore.currentUser = supabase.auth.user();

                const updates: definitions["guests"] = {
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
            } catch (error: any) {
                toast.error(error.message);
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
            website,
            avatar_url,

            updateProfile,
            signOut,
        };
    },
};
</script>

<style scoped lang="postcss">
form {
    @apply flex flex-col items-center space-y-4;
}

input[type="text"]
,input[type="website"] {
    @apply border border-gray-300 rounded-lg text-black/80 p-2 font-semibold;
}

.email {
    @apply !text-white;
}

label {
    @apply pr-3;
}
</style>
