<template>
    <div>
        <div>Menü für {{ activeGuest.name }}:</div>
        <div class="list">
            <div class="menu-item" v-for="menuItem in menuItems" :key="menuItem.id">
                <MenuItem :menu-item="menuItem" @menu-item-change="setSelectedMenuItem">
                </MenuItem>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import MenuItem from "@/components/MenuItem.vue";
import MenuItemType from "@/types/MenuItem";
import { getMenuItems } from "@/interfaces/menu";
import { useGuestStore } from "@/stores/GuestStore";
import { storeToRefs } from "pinia";

export default defineComponent({
    components: {
        MenuItem,
    },
    emits: ["menuItemChange"],
    setup(_, { emit }) {
        const guestStore = useGuestStore();
        const menuItems = ref<MenuItemType[]>(getMenuItems());
        const { getActiveGuest: activeGuest } = storeToRefs(guestStore);

        function setSelectedMenuItem(menuItemId: string) {
            emit("menuItemChange", menuItemId);
        }

        return {
            menuItems,
            setSelectedMenuItem,
            activeGuest,
        };
    },
});
</script>

<style scoped lang="postcss">
.list {
    @apply flex flex-row justify-around;
}

.menu-item {
    @apply px-10;
}
</style>
