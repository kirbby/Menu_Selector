<template>
<label>
    <input type="radio" :name="$props.radioGroup" @change="update($event, menuItem)" :value="menuItem.id" :checked="selected" />
    <div class="item">
        <img class="image" v-if="menuItem.imageUrl != null && menuItem.imageUrl != ''" :src="menuItem.imageUrl" />
        <div class="name">{{ menuItem.name }}</div>
        <!-- <div class="description">{{ menuItem.description }}</div> -->
    </div>
</label>
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
    @apply flex flex-col p-4 md:p-8 justify-evenly border-2 border-gray-300 rounded-lg h-full;
}

label {
    @apply flex flex-col justify-between mx-auto flex-shrink-0 w-1/2 h-full;
}

.name {
    @apply text-lg font-bold break-words;
}

.image {
    @apply flex mx-auto justify-center items-center max-h-20 md:max-h-full rounded;
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
