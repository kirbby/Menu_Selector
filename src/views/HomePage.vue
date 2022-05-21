<template>
    <div>
        <MenuItem
            :menu-item="menuItem"
            v-for="menuItem in menuItems"
            :key="menuItem.id"
        >
        </MenuItem>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import MenuItem from "@/components/MenuItem.vue";
import MenuItemType from "@/types/MenuItem";

export default defineComponent({
    components: {
        MenuItem,
    },
    setup() {
        const menuItems = ref<MenuItemType[]>([]);

        return {
            menuItems,
        };
    },
});
</script>

<style scoped lang="postcss"></style>
