<template>
<div>
    <Transition name="button">
        <button v-if="!isGuestListVisible" class="button" @click="isGuestListVisible = true">-</button>
    </Transition>
    <Transition>
        <div v-if="isGuestListVisible">
            <button class="button close-button" @click="isGuestListVisible = false">X</button>
            <div class="container">
                <div>Deine Gäste:</div>
                <ul>
                    <li v-for="guest in guests" :key="guest.id" @click="onGuestClick(guest)" class="guest-item"
                        :class="currentGuest?.id == guest.id ? 'active' : ''">
                        <div>{{ guest.name }}</div>
                        <button class="delete-button" @click.stop="deleteGuest(guest)">X</button>
                    </li>
                </ul>
                <form class="add-container" @submit.prevent="addGuest">
                    <input class="new-guest-name" type="text" v-model="name" />
                    <button class="add-button">+</button>
                </form>
            </div>
        </div>
    </Transition>
</div>
</template>

<script lang="ts">
import { useGuestStore } from "@/stores/GuestStore";
import Guest from "@/types/Guest";
import { storeToRefs } from "pinia";
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        const guestStore = useGuestStore();
        const { getCurrentGuest: currentGuest, getGuests: guests } = storeToRefs(guestStore);
        const isGuestListVisible = ref(true);
        const name = ref("");

        function onGuestClick(guest: Guest) {
            guestStore.$state.currentGuest = guest;
        }

        function deleteGuest(guest: Guest) {
            guestStore.deleteGuest(guest);
        }

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
            guests,
            onGuestClick,
            currentGuest,
            deleteGuest,
            isGuestListVisible,
            addGuest,
            name,
        };
    },
});
</script>

<style scoped lang="postcss">
.container {
    @apply w-fit m-4 flex flex-col space-y-2;
}

.guest-item {
    @apply flex flex-row justify-between space-x-2 px-2 rounded-md cursor-pointer;
}

.guest-item.active {
    @apply bg-gray-200 text-black;
}

.delete-button {
    @apply px-1;
}

.add-button {
    @apply m-auto px-2 bg-blue-500 text-3xl rounded-lg;
}

.add-container {
    @apply flex flex-row justify-between space-x-2;
}

.new-guest-name {
    @apply w-40 pl-2 rounded-lg text-black;
}

.close-button {
    @apply absolute top-0 right-0 !p-2 !py-1 !m-1;
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
