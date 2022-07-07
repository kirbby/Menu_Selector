<template>
<div>
    <Transition>
        <form v-if="isGuestInputVisible" class="guest-data" @submit.prevent="addGuest">
            <label class="guest-label">
                <span>Name:</span>
                <input class="input" type="text" v-model="name" />
            </label>
            <label class="guest-label">
                <span>Email:</span>
                <input class="input" type="email" v-model="email" />
            </label>
            <button class="button add-button" type="submit">
                Gast hinzufügen
            </button>
            <button class="button close-button" @click="isGuestInputVisible = false">X</button>
        </form>
    </Transition>
    <Transition name="button">
        <button v-if="!isGuestInputVisible" class="button" @click="isGuestInputVisible = true">+</button>
    </Transition>
</div>
</template>

<script lang="ts">
import { useGuestStore } from "@/stores/GuestStore";
import Guest from "@/types/Guest";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        const email = ref("test");
        const emailExists = computed(() => email.value.includes("@"));
        const name = ref("");
        const guestStore = useGuestStore();
        const isGuestInputVisible = ref(true);

        function addGuest() {
            if (name.value === "") {
                return;
            }

            const newGuest: Guest = {
                id: Math.random(),
                name: name.value,
                selectedMenuItems: [],
            };

            guestStore.$state.guests.push(newGuest);
            guestStore.$state.currentGuest = newGuest;

            name.value = "";
        }

        return {
            email,
            emailExists,
            addGuest,
            name,
            isGuestInputVisible,
        };
    }
});
</script>

<style scoped lang="postcss">
.guest-data {
    @apply w-fit py-8 px-12 m-auto flex flex-col space-y-6 border-2 border-gray-300 rounded-lg relative;
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

.add-button {
    @apply mx-auto;
    transition-delay: 1s;
}

.close-button {
    @apply absolute top-0 right-0 !px-3 !py-1 !m-1;
}

.v-enter-active {
  animation: bounce-in 0.5s;
}
.v-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

.button-enter-active {
    transition: opacity 0.5s ease;
    transition-delay: 0.5s;
    animation: bounce-in 0.5s;
    animation-delay: 0.5s;
}

.button-enter-from {
    opacity: 0;
}
</style>
