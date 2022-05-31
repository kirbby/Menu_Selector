<template>
<div>
    <div v-if="activeGuest?.id">Menü für {{ activeGuest.name }}:</div>
    <div class="list">
        <div class="menu-item" v-for="menuItem in menuItems" :key="menuItem.id">
            <MenuItem :menu-item="menuItem" :isSelected="menuItem.id === selectedMenuId" @menu-item-selected="setSelectedMenuItem">
            </MenuItem>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import {
    defineComponent,
    PropType,
    ref,
    watch
} from "vue";
import MenuItem from "@/components/MenuItem.vue";
import MenuItemType from "@/types/MenuItem";
import { getMenuItems } from "@/interfaces/menu";
import { useGuestStore } from "@/stores/GuestStore";
import { storeToRefs } from "pinia";

export default defineComponent({
    props: {
        menuCategoryId: {
            type: Number as PropType<number>,
            required: true,
        },
    },
    components: {
        MenuItem,
    },
    setup() {
        const guestStore = useGuestStore();
        const menuItems = ref<MenuItemType[]>(getMenuItems(1));
        const {
            getActiveGuest: activeGuest,
            getActiveGuestMenuIdOnCategoryId: getActiveGuestMenuIdOnCategoryId
        } = storeToRefs(guestStore);
        const selectedMenuId = ref(getActiveGuestMenuIdOnCategoryId.value(1));

        watch(() => activeGuest.value, function () {
            selectedMenuId.value = getActiveGuestMenuIdOnCategoryId.value(1);
        });

        function setSelectedMenuItem(menuItem: MenuItemType) {
            guestStore.changeGuestMenu(menuItem);
        }

        return {
            menuItems,
            setSelectedMenuItem,
            activeGuest,
            selectedMenuId,
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
