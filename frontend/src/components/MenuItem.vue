<template>
<div>
    <label>
        <input type="radio" name="menu" @change="update($event, menuItem)" :value="menuItem.id" v-model="selected" />
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
import MenuItem from "@/types/MenuItem";
import {
    defineComponent,
    PropType,
    ref,
    watch,
} from "vue";

export default defineComponent({
    props: {
        menuItem: {
            type: Object as PropType<MenuItem>,
            required: true,
        },
        isSelected: {
            type: Boolean as PropType<boolean>,
            default: false,
        },
    },
    emits: ["menuItemSelected"],
    setup(props, { emit }) {
        const selected = ref(props.isSelected);

        watch(() => props.isSelected, function () {
            selected.value = props.isSelected;
            console.log(selected.value);
        });

        function update(event: Event, menuItemId: MenuItem) {
            if (event.target instanceof HTMLInputElement) {
                if (event.target.checked) {
                    emit("menuItemSelected", menuItemId);
                }
            }
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
