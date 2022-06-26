<template>
<div>
    <label>
        <input type="radio" :name="$props.radioGroup" @change="update($event, menuItem)" :value="menuItem.id" :checked="selected" />
        <div class="item">
            <div class="image-container">
                <img v-if="menuItem.imageUrl != null && menuItem.imageUrl != ''" :src="menuItem.imageUrl" />
            </div>
            <div class="name">{{ menuItem.name }}</div>
            <div class="description">{{ menuItem.description }}</div>
        </div>
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
        radioGroup: {
            type: String as PropType<string>,
            required: true,
        },
    },
    emits: ["menuItemSelected"],
    setup(props, { emit }) {
        const selected = ref(props.isSelected);

        watch(() => props.isSelected, function () {
            selected.value = props.isSelected;
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
.item {
    @apply border-2 border-gray-300 rounded-lg p-4 space-y-2;
}

label {
    @apply flex flex-col space-y-4 justify-between;
}

.name {
    @apply text-2xl font-bold;
}

.image-container {
    @apply flex flex-row justify-center items-center;
}

.image-container img {
    @apply h-40 rounded;
}

input[type="radio"] {
    appearance: none;
    -webkit-appearance: none;
    display: none;
}

input[type="radio"]:checked + .item {
    @apply bg-blue-500;
}

input[type="radio"]:not(:checked) + .item {
    @apply bg-gray-700;
}
</style>
