<template>
    <div class="list">
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

        menuItems.value.push({
            id: "1",
            name: "Ramen",
            description:
                "A Japanese noodle soup dish consisting of Chinese-style wheat noodles served in a meat- or (occasionally) fish-based broth, often flavored with soy sauce or miso, and uses toppings such as sliced pork, dried seaweed, kamaboko, and green onions.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Soy_ramen.jpg/220px-Soy_ramen.jpg",
        });

        menuItems.value.push({
            id: "2",
            name: "Sushi",
            description:
                "Sushi is a Japanese dish of cooked rice that is usually served with raw fish, vegetables, or other ingredients such as sesame seeds, as well as other ingredients such as rice, seaweed, and sugar.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Soy_ramen.jpg/220px-Soy_ramen.jpg",
        });

        return {
            menuItems,
        };
    },
});
</script>

<style scoped lang="postcss">
.list {
    @apply flex flex-row space-x-40;
}
</style>
