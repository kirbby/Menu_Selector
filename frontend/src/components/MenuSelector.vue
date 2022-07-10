<template>
<div class="menu-selector">
    <div class="header">{{ menuCourseName }}</div>
    <div class="list">
        <MenuItemComponent v-for="menuItem in menuItems" :key="menuItem.id" :menu-item="menuItem" :is-selected="menuItem.id === selectedMenuId" :radio-group="'menu-' + menuItem.courseId"
                           @menu-item-selected="setSelectedMenuItem">
        </MenuItemComponent>
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
import MenuItemComponent from "@/components/MenuItem.vue";
import { getMenuItems } from "@/interfaces/menuRest";
import { useGuestStore } from "@/stores/GuestStore";
import { storeToRefs } from "pinia";
import { getCourse } from "@/interfaces/courseRest";
import MenuItem from "@/types/MenuItem";

export default defineComponent({
    props: {
        menuCourseId: {
            type: Number as PropType<number>,
            required: true,
        },
    },
    components: {
        MenuItemComponent,
    },
    setup(props) {
        const guestStore = useGuestStore();
        const menuItems = ref<MenuItem[]>([]);
        const {
            getCurrentGuest: currentGuest,
            getCurrentGuestMenuIdOnCourseId: getCurrentGuestMenuIdOnCourseId
        } = storeToRefs(guestStore);
        const selectedMenuId = ref(getCurrentGuestMenuIdOnCourseId.value(props.menuCourseId));
        const menuCourseName = ref("");

        watch(() => currentGuest.value, function () {
            selectedMenuId.value = getCurrentGuestMenuIdOnCourseId.value(props.menuCourseId);
        });

        (async () => menuItems.value = await getMenuItems(props.menuCourseId))();
        (async () => menuCourseName.value = (await getCourse(props.menuCourseId))?.name ?? "")();

        function setSelectedMenuItem(menuItem: MenuItem) {
            guestStore.changeGuestMenu(menuItem);
        }

        return {
            menuItems,
            setSelectedMenuItem,
            currentGuest,
            selectedMenuId,
            menuCourseName,
        };
    },
});
</script>

<style scoped lang="postcss">
.menu-selector {
    @apply h-full flex flex-col;
}

.list {
    @apply flex flex-1 overflow-x-auto space-x-2 px-8 my-2 scrollbar-hide;
}

.header {
    @apply m-2 text-xl tracking-wide;
}
</style>
