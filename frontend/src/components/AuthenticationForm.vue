<template>
<form @submit.prevent="handleLogin">
    <h1>Cater <br><span class="text-green-700">Buddy</span></h1>
    <div class="sign-in-container">
        <p class="description">Melde dich mit deiner E-Mail per Einmalcode an</p>
        <input type="email" placeholder="E-Mail" v-model="email" />
        <input class="button px-6" type="submit" :value="loading ? 'Loading' : 'Login'" :disabled="loading" />
    </div>
</form>
</template>

<script lang="ts">
import { ref } from "vue";
import supabase from "@/supabaseClient";
import { useToast } from "vue-toastification";

export default {
    setup() {
        const loading = ref(false);
        const email = ref("");
        const toast = useToast();

        const handleLogin = async () => {
            try {
                loading.value = true;
                const { error } = await supabase.auth.signIn({
                    email: email.value
                }, {
                    redirectTo: window.location.origin + import.meta.env.BASE_URL
                });
                if (error) {
                    throw error;
                }

                toast.info("Du bekommst ein E-Mail mit dem Login Link!");
            } catch (error: unknown) {
                if (typeof error === "string") {
                    console.error(error);
                } else if (error instanceof Error) {
                    console.error(error.message);
                }
            } finally {
                loading.value = false;
            }
        };

        return {
            loading,
            email,
            handleLogin,
        };
    },
};
</script>

<style scoped lang="postcss">
form {
    @apply h-full py-10 mb-24 flex flex-col items-center justify-center space-y-8;
}

input[type="email"] {
    @apply border border-gray-300 rounded-lg p-2 text-lg text-black/80 font-semibold;
}

h1 {
    @apply text-6xl text-gray-300 font-bold;
}

.sign-in-container {
    @apply flex flex-col items-center space-y-4;
}

.description {
    @apply text-gray-300 text-center text-sm;
}
</style>
