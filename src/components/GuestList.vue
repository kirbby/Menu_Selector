<template>
    <div>
        <ul>
            <li v-for="guest in guests" :key="guest.id" @click="onGuestClick(guest)" class="guest-item"
                :class="activeGuest.id == guest.id ? 'active' : ''">
                <div>{{ guest.name }}</div>
                <button class="delete-button" @click="deleteGuest(guest)">X</button>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { useGuestStore } from "@/stores/GuestStore";
import Guest from "@/types/Guest";
import { storeToRefs } from "pinia";
import { computed, defineComponent } from "vue";

export default defineComponent({
    setup() {
        const guestStore = useGuestStore();
        const { getActiveGuest: activeGuest, getGuests: guests } = storeToRefs(guestStore);

        function onGuestClick(guest: Guest) {
            guestStore.$state.activeGuest = guest;
        }

        function deleteGuest(guest: Guest) {
            guestStore.deleteGuest(guest);
        }

        return {
            guests,
            onGuestClick,
            activeGuest,
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
