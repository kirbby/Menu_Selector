<template>
<div>
    <button class="button add-button">+</button>
    <ol class="list">
        <li class="menu-item" v-for="menuItem in menuItems" :key="menuItem.id">
            <span>{{ menuItem.name }}</span>
            <span>{{ menuItem.courseId }}</span>
        </li>
    </ol>
</div>
</template>

<script lang="ts">
import { getAllMenuItems } from "@/interfaces/menuRest";
import MenuItem from "@/types/MenuItem";
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        const menuItems = ref<MenuItem[]>([]);

        (async () => {
            menuItems.value = await getAllMenuItems();
            menuItems.value.sort((a, b) => (a.courseId ?? 1000) - (b.courseId ?? 1000) || a.name.localeCompare(b.name));
        })();

        return {
            menuItems,
        };
    }
});
</script>

<style scoped lang="postcss">
.add-button {
    @apply fixed top-12 right-6 m-auto py-0 px-2 bg-blue-500 text-2xl rounded;
}

.list {
    @apply my-12 mx-6 space-y-2;
}

.menu-item {
    @apply flex flex-row justify-between space-x-2 p-2 rounded bg-gray-500 border font-semibold;
}
</style>
