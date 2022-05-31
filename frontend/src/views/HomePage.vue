<template>
<div class="home-page">
    <GuestList class="guest-list"></GuestList>
    <div class="guest-data">
        <h1>Gast:</h1>
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
    <MenuSelector :menu-category-id="1"></MenuSelector>
    <button class="button save-button" @click="saveMenu">
        Menü speichern
    </button>
</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import MenuSelector from "@/components/MenuSelector.vue";
import { saveMenu } from "@/interfaces/menu";
import { useGuestStore } from "@/stores/GuestStore";
import GuestList from "@/components/GuestList.vue";

export default defineComponent({
    components: {
        MenuSelector,
        GuestList
    },
    setup() {
        const email = ref("test");
        const emailExists = computed(() => email.value.includes("@"));
        const name = ref("");
        const showPopup = ref(false);
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
            showPopup,
            saveMenu,
        };
    },
});
</script>

<style scoped lang="postcss">
.input {
    @apply border border-gray-300 rounded-lg text-black;
}

.button {
    @apply py-2 px-5 bg-blue-500 text-white rounded-lg;
}

.guest-data {
    @apply flex flex-col space-y-4;
}

.guest-label {
    @apply space-x-2 items-center;
}

.add-button {
    @apply mx-auto;
}

.home-page {
    @apply space-y-10;
}

.guest-list {
    @apply absolute top-10 right-10 bg-red-600 p-4 rounded-lg;
}
</style>
