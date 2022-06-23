<template>
<div>
    <div class="list">
        <div class="menu-item" v-for="menuItem in menuItems" :key="menuItem.id">
            <MenuItem :menu-item="menuItem" :is-selected="menuItem.id === selectedMenuId" :radio-group="'menu-' + menuItem.courseId"
                      @menu-item-selected="setSelectedMenuItem">
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
        menuCourseId: {
            type: Number as PropType<number>,
            required: true,
        },
    },
    components: {
        MenuItem,
    },
    setup(props) {
        const guestStore = useGuestStore();
        const menuItems = ref<MenuItemType[]>([]);
        const {
            getActiveGuest: activeGuest,
            getActiveGuestMenuIdOnCourseId: getActiveGuestMenuIdOnCourseId
        } = storeToRefs(guestStore);
        const selectedMenuId = ref(getActiveGuestMenuIdOnCourseId.value(props.menuCourseId));

        watch(() => activeGuest.value, function () {
            selectedMenuId.value = getActiveGuestMenuIdOnCourseId.value(props.menuCourseId);
        });

        (async () => menuItems.value = await getMenuItems(props.menuCourseId))();

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
