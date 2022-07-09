<template>
<div class="homepage">
    <GuestList></GuestList>
    <!--  <div class="flex flex-row justify-center space-x-4">
                    <div v-if="currentGuest?.id">Menü für {{ currentGuest.name }}:</div>
                    <button class="button save-button" @click="saveMenu">
                        Menü speichern
                    </button>
                </div> -->
    <MenuSelector class="menu-selector" :menu-course-id="1"></MenuSelector>
    <MenuSelector class="menu-selector" :menu-course-id="2"></MenuSelector>
    <MenuSelector class="menu-selector" :menu-course-id="3"></MenuSelector>
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
    @apply relative py-6 h-full space-y-4 overflow-y-auto overflow-x-hidden scrollbar-hide;
}

.menu-selector {
    @apply h-1/3;
}
</style>
