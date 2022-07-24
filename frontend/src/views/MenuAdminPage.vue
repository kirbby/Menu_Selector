<template>
<div>
    <button class="button add-button">+</button>
    <ol class="list">
        <li class="menu-item" v-for="menuItem in menuItems" :key="menuItem.id">
            <img class="image" :src="menuItem.imageUrl">
            <div class="item-details">
                <div class="name">{{ menuItem.name }}</div>
                <div class="course">{{ menuItem.course.name }}</div>
            </div>
            <div class="button-container">
                <button class="button">edit</button>
            </div>
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
    @apply h-20 flex items-center space-x-4 p-3 rounded bg-gray-500 border font-semibold;
}

.item-details {
    @apply flex-auto;
}

.name {
    @apply flex text-left line-clamp-2;
}

.course {
    @apply flex flex-row justify-between space-x-2 text-xs;
}

.button-container {
    @apply flex flex-row justify-between space-x-2 mr-3;
}

.image {
    @apply w-20 justify-center items-center max-h-20 md:max-h-full rounded;
}
</style>
