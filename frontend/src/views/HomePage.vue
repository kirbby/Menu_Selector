<template>
<div class="homepage">
    <GuestList class="guest-list"></GuestList>
    <!-- <GuestAdd class="guest-add"></GuestAdd> -->
    <!--  <div class="flex flex-row justify-center space-x-4">
        <div v-if="currentGuest?.id">Menü für {{ currentGuest.name }}:</div>
        <button class="button save-button" @click="saveMenu">
            Menü speichern
        </button>
    </div> -->
    <MenuSelector :menu-course-id="1"></MenuSelector>
    <MenuSelector :menu-course-id="2"></MenuSelector>
</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MenuSelector from "@/components/MenuSelector.vue";
import { saveMenu } from "@/interfaces/menu";
import { useGuestStore } from "@/stores/GuestStore";
import GuestList from "@/components/GuestList.vue";
import { storeToRefs } from "pinia";
import GuestAdd from "@/components/GuestAdd.vue";

export default defineComponent({
    components: {
        MenuSelector,
        GuestList,
        // GuestAdd
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
:deep(.button) {
    @apply py-2 px-5 bg-blue-500 text-white rounded-lg;
}

.homepage {
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */
    @apply space-y-10 relative pb-10 overflow-y-auto h-full;
}

.homepage::-webkit-scrollbar {
    @apply hidden;
}

.guest-list {
    @apply absolute top-2 right-2 bg-blue-400 rounded-lg;
}
</style>
