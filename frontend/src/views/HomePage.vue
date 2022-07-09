<template>
<div class="homepage">
    <GuestList class="guest-list"></GuestList>
    <!--  <div class="flex flex-row justify-center space-x-4">
        <div v-if="currentGuest?.id">Menü für {{ currentGuest.name }}:</div>
        <button class="button save-button" @click="saveMenu">
            Menü speichern
        </button>
    </div> -->
    <MenuSelector class="menu-selector" :menu-course-id="1"></MenuSelector>
    <MenuSelector class="menu-selector" :menu-course-id="2"></MenuSelector>
</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MenuSelector from "@/components/MenuSelector.vue";
import { saveMenu } from "@/interfaces/menu";
import { useGuestStore } from "@/stores/GuestStore";
import GuestList from "@/components/GuestList.vue";
import { storeToRefs } from "pinia";

export default defineComponent({
    components: {
        MenuSelector,
        GuestList,
    },
    setup() {
        const guestStore = useGuestStore();
        const { getCurrentGuest: currentGuest } = storeToRefs(guestStore);

        return {
            saveMenu,
            currentGuest,
        };
    },
});
</script>

<style scoped lang="postcss">
.homepage {
    @apply space-y-10 relative pb-16 overflow-y-auto overflow-x-hidden h-full scrollbar-hide;
}

.guest-list {
    @apply absolute top-2 right-2 bg-blue-400 rounded-lg;
}

.menu-selector {
    @apply h-1/3 overflow-hidden;
}
</style>
