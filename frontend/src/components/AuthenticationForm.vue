<template>
<form @submit.prevent="handleLogin">
    <p class="description">Sign in via magic link with your email below</p>
    <div>
        <input type="email" placeholder="Your email" v-model="email" />
    </div>
    <div>
        <input class="button" type="submit" :value="loading ? 'Loading' : 'Send magic link'" :disabled="loading" />
    </div>
</form>
</template>

<script lang="ts">
import { ref } from "vue";
import supabase from "@/supabaseClient";

export default {
    setup() {
        const loading = ref(false);
        const email = ref("");

        const handleLogin = async () => {
            try {
                loading.value = true;
                const { error } = await supabase.auth.signIn({
                    email: email.value
                });
                if (error) {
                    throw error;
                }

                alert("Check your email for the login link!");
            } catch (error: any) {
                alert(error.error_description || error.message);
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
    @apply flex flex-col items-center space-y-4;
}

input[type="email"] {
    @apply border border-gray-300 rounded-lg p-2 text-lg text-black/80 font-semibold;
}
</style>
