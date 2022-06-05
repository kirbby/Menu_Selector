<template>
<div class="guest-data">
    <label class="guest-label">
        <span>Name:</span>
        <input class="input" type="text" v-model="name" />
    </label>
    <label class="guest-label">
        <span>Email:</span>
        <input class="input" type="email" v-model="email" />
    </label>
    <button class="button add-button" @click="addGuest">
        Gast hinzufügen
    </button>
</div>
</template>

<script lang="ts">
import { useGuestStore } from "@/stores/GuestStore";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        const email = ref("test");
        const emailExists = computed(() => email.value.includes("@"));
        const name = ref("");
        const guestStore = useGuestStore();

        function addGuest() {
            if (name.value === "") {
                return;
            }

            const newGuest = {
                id: Math.random(),
                name: name.value,
                email: email.value,
                selectedMenus: [],
            };

            guestStore.$state.guests.push(newGuest);
            guestStore.$state.activeGuestId = newGuest.id;

            name.value = "";
        }

        return {

            email,
            emailExists,
            addGuest,

            name,
        };
    }
});
</script>

<style scoped lang="postcss">
.guest-data {
    @apply w-fit p-8 m-auto flex flex-col space-y-6 border-2 border-gray-300 rounded-lg;
}

.guest-label {
    @apply w-full flex flex-row space-x-2 items-center;
}

.guest-label span {
    @apply w-16;
}

.input {
    @apply px-3 border border-gray-300 rounded-lg text-black;
}
</style>
