<template>
    <label>
        <input type="radio" name="menu" :value="menuItem.id" />
        <div class="name">{{ menuItem.name }}</div>
        <div class="image">
            <img
                v-if="menuItem.image != null && menuItem.image != ''"
                :src="menuItem.image"
            />
            <span v-else class="material-icon">ramen</span>
        </div>
        <div class="description">{{ menuItem.description }}</div>
    </label>
</template>

<script lang="ts">
import MenuItem from "@/types/MenuItem";
import { defineComponent, PropType } from "vue";

export default defineComponent({
    props: {
        menuItem: {
            type: Object as PropType<MenuItem>,
            required: true,
        },
    },
    setup() {
        return {};
    },
});
</script>

<style scoped lang="postcss"></style>
