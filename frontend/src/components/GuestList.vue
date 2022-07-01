<template>
<div>
    <div>Deine Gäste:</div>
    <ul>
        <li v-for="guest in guests" :key="guest.id" @click="onGuestClick(guest)" class="guest-item"
            :class="currentGuest?.id == guest.id ? 'active' : ''">
            <div>{{ guest.name }}</div>
            <button class="delete-button" @click.stop="deleteGuest(guest)">X</button>
        </li>
    </ul>
</div>
</template>

<script lang="ts">
import { useGuestStore } from "@/stores/GuestStore";
import Guest from "@/types/Guest";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";

export default defineComponent({
    setup() {
        const guestStore = useGuestStore();
        const { getCurrentGuest: currentGuest, getGuests: guests } = storeToRefs(guestStore);

        function onGuestClick(guest: Guest) {
            guestStore.$state.currentGuestId = guest.id;
        }

        function deleteGuest(guest: Guest) {
            guestStore.deleteGuest(guest);
        }

        return {
            guests,
            onGuestClick,
            currentGuest,
            deleteGuest,
        };
    },
});
</script>

<style scoped lang="postcss">
.guest-item {
    @apply flex flex-row justify-between space-x-2 px-2 rounded-md cursor-pointer;
}

.guest-item.active {
    @apply bg-gray-200 text-black;
}

.delete-button {
    @apply px-1;
}
</style>
