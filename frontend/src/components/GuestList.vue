<template>
<div>
    <Transition name="button">
        <button v-if="!isGuestListVisible" class="button open-guest-list" @click="openGuestList">G</button>
    </Transition>
    <Transition>
        <div v-if="isGuestListVisible" class="guest-list" ref="guestList">
            <button class="button close-button" @click="isGuestListVisible = false">X</button>
            <div class="guest-container">
                <div>Deine Gäste:</div>
                <ul>
                    <li v-for="guest in guests" :key="guest.id" @click="onGuestClick(guest)" class="guest-item"
                        :class="currentGuest?.id === guest.id ? 'active' : ''">
                        <div>{{ guest.name }}</div>
                        <button class="delete-button" @click.stop="deleteGuest(guest)">X</button>
                    </li>
                </ul>
                <form class="add-container" @submit.prevent="addGuest">
                    <input class="new-guest-name" type="text" placeholder="Name" v-model="name" />
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
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
    setup() {
        const guestStore = useGuestStore();
        const { getCurrentGuest: currentGuest, getGuests: guests } = storeToRefs(guestStore);
        const isGuestListVisible = ref(true);
        const name = ref("");
        const guestList = ref<HTMLDivElement | null>(null);

        watch(() => guestList.value, function () {
            setTimeout(() => {
                if (guestList.value) {
                    guestList.value.scrollIntoView({ behavior: "smooth" });
                }
            }, 100);
        });

        function onGuestClick(guest: Guest) {
            guestStore.$state.currentGuest = guest;
        }

        function deleteGuest(guest: Guest) {
            guestStore.deleteGuest(guest);
        }

        async function addGuest() {
            if (name.value === "") {
                return;
            }

            guestStore.addGuest(name.value);

            name.value = "";
        }

        function openGuestList() {
            isGuestListVisible.value = true;
        }

        return {
            guests,
            onGuestClick,
            currentGuest,
            deleteGuest,
            isGuestListVisible,
            addGuest,
            name,
            openGuestList,
            guestList,
        };
    },
});
</script>

<style scoped lang="postcss">
.open-guest-list {
    @apply fixed top-12 right-5 border;
}

.guest-list {
    @apply w-fit mx-auto bg-gray-700 rounded-lg relative scroll-m-8;
}

.guest-container {
    @apply w-fit p-3 flex flex-col space-y-2;
}

.guest-item {
    @apply flex flex-row justify-between space-x-2 px-2 rounded cursor-pointer;
}

.guest-item.active {
    @apply bg-gray-200 text-black;
}

.delete-button {
    @apply px-1;
}

.add-button {
    @apply m-auto px-2 bg-blue-500 text-3xl rounded;
}

.add-container {
    @apply flex flex-row justify-between space-x-2;
}

.new-guest-name {
    @apply w-40 pl-2 rounded text-black;
}

.close-button {
    @apply absolute top-0 right-2 !px-3 !py-1 !m-1;
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
