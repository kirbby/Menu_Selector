<template>
    <div>
        <div class="list">
            <div v-for="menuItem in menuItems" :key="menuItem.id">
                <MenuItem
                    :menu-item="menuItem"
                    @menu-item-change="setSelectedMenuItem"
                >
                </MenuItem>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import MenuItem from "@/components/MenuItem.vue";
import MenuItemType from "@/types/IMenuItem";

export default defineComponent({
    components: {
        MenuItem,
    },
    emits: ["menuItemChange"],
    setup(_, { emit }) {
        const menuItems = ref<MenuItemType[]>([]);

        function setSelectedMenuItem(menuItemId: string) {
            emit("menuItemChange", menuItemId);
        }

        return {
            menuItems,
            setSelectedMenuItem,
        };
    },
});
</script>

<style scoped lang="postcss">
.list {
    @apply flex flex-row space-x-40;
}
</style>
