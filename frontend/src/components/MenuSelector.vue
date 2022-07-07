<template>
<div>
    <div class="header">{{ menuCourseName }}</div>
    <div class="list">
        <div class="menu-item" v-for="menuItem in menuItems" :key="menuItem.id">
            <MenuItemComponent :menu-item="menuItem" :is-selected="menuItem.id === selectedMenuId" :radio-group="'menu-' + menuItem.courseId"
                               @menu-item-selected="setSelectedMenuItem">
            </MenuItemComponent>
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
import MenuItemComponent from "@/components/MenuItem.vue";
import { getMenuItems } from "@/interfaces/menu";
import { useGuestStore } from "@/stores/GuestStore";
import { storeToRefs } from "pinia";
import { getCourse } from "@/interfaces/course";
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
.list {
    @apply grid grid-cols-2 justify-around;
}

.menu-item {
    @apply px-10;
}

.header {
    @apply m-2 text-xl tracking-wide;
}
</style>
