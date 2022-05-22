import Guest from "@/types/IGuest";
import { defineStore } from "pinia";

export const useGuestStore = defineStore("guest", {
    state: () => ({
        guests: [] as Guest[],
    }),
    getters: {
        getGuests(state): Guest[] {
            return state.guests;
        },
        getGuestOnId(state): (id: string) => Guest | undefined {
            return (id: string) =>
                state.guests.find((guest: Guest) => guest.id === id);
        },
    },
    actions: {},
    persist: true,
});
