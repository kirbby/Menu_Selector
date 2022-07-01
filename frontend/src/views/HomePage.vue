<template>
<div class="home-page">
    <GuestList class="guest-list"></GuestList>
    <GuestAdd class="guest-add"></GuestAdd>
    <!--  <div class="flex flex-row justify-center space-x-4">
        <div v-if="activeGuest?.id">Menü für {{ activeGuest.name }}:</div>
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
        GuestAdd
    },
    setup() {
        const guestStore = useGuestStore();
        const { getActiveGuest: activeGuest } = storeToRefs(guestStore);

        return {
            saveMenu,
            activeGuest,
        };
    },
});
</script>

<style scoped lang="postcss">
:deep(.button) {
    @apply py-2 px-5 bg-blue-500 text-white rounded-lg;
}

.home-page {
    @apply space-y-10;
}

.guest-list {
    @apply absolute top-10 right-10 bg-blue-400 p-4 rounded-lg;
}
</style>
