<template>
    <div>
        <label>
            <input type="radio" name="menu" @change="update(menuItem)" :value="menuItem.id" v-model="selected" />
            <div class="name">{{ menuItem.name }}</div>
            <div class="image">
                <img v-if="menuItem.image != null && menuItem.image != ''" :src="menuItem.image" />
                <span v-else class="material-icon">ramen</span>
            </div>
            <div class="description">{{ menuItem.description }}</div>
        </label>
    </div>
</template>

<script lang="ts">
import { useGuestStore } from "@/stores/GuestStore";
import MenuItem from "@/types/MenuItem";
import { storeToRefs } from "pinia";
import { defineComponent, PropType, ref, watch } from "vue";

export default defineComponent({
    props: {
        menuItem: {
            type: Object as PropType<MenuItem>,
            required: true,
        },
    },
    emits: ["menuItemChange"],
    setup(props, { emit }) {
        const guestStore = useGuestStore();
        const { getActiveGuest: activeGuest } = storeToRefs(guestStore);
        const selected = ref("");
        watch(() => activeGuest.value?.id, (newValue) => {
            if (newValue) {
                selected.value = "";
                selected.value = activeGuest.value?.selectedMenus.includes(props.menuItem) ? "2" : "2";
            }
        });

        function update(menuItemId: MenuItem) {
            emit("menuItemChange", menuItemId);
        }

        return {
            update,
            selected,
        };
    },
});
</script>

<style scoped lang="postcss">
</style>
