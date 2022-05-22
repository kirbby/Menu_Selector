<template>
    <div>
        <MenuSelector @menu-item-change="setSelectedMenuItem"></MenuSelector>
        <div v-if="showPopup">
            <label>
                <span>Email:</span>
                <input class="input" type="email" v-model="email" />
            </label>
            <label>
                <span>Name:</span>
                <input class="input" type="text" v-model="name" />
            </label>
            <button class="button save-button" @click="saveMenu">
                Speichern
            </button>
        </div>
        <button class="button add-button" @click="addMenu">
            + Menü speichern
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import MenuSelector from "@/components/MenuSelector.vue";
import { saveMenu as saveMenuRest } from "@/interfaces/menu";
import { useGuestStore } from "@/stores/GuestStore";

export default defineComponent({
    components: {
        MenuSelector,
    },
    setup() {
        const email = ref("");
        const emailExists = computed(() => {
            return email.value.includes("@");
        });
        const name = ref("");
        const showPopup = ref(false);
        const currentMenuItem = ref<string>("");
        const guestStore = useGuestStore();

        function addMenu() {
            showPopup.value = true;
        }

        function saveMenu() {
            if (name.value === "") {
                return;
            }

            guestStore.$state.guests.push({
                id: Math.random().toString(),
                name: name.value,
                email: email.value,
                selectedMenus: [currentMenuItem.value],
            });
            saveMenuRest();

            name.value = "";
            showPopup.value = false;
        }

        function setSelectedMenuItem(menuItemId: string) {
            currentMenuItem.value = menuItemId;
        }

        return {
            email,
            emailExists,
            addMenu,
            saveMenu,
            name,
            showPopup,
            setSelectedMenuItem,
        };
    },
});
</script>

<style scoped lang="postcss">
.input {
    @apply border border-gray-300 rounded-lg;
}

.save-button {
    @apply py-2 px-5 bg-blue-500 text-white rounded-lg;
}
</style>
