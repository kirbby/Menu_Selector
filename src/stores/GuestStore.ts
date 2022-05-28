import Guest from "@/types/Guest";
import { defineStore } from "pinia";

export const useGuestStore = defineStore("guest", {
    state: () => ({
        guests: [] as Guest[],
        activeGuest: {} as Guest,
    }),
    getters: {
        getGuests(state): Guest[] {
            return state.guests;
        },
        getGuestOnId(state): (id: string) => Guest | undefined {
            return (id: string) =>
                state.guests.find((guest: Guest) => guest.id === id);
        },
        getActiveGuest(state): Guest {
            return state.activeGuest;
        }
    },
    actions: {
        deleteGuest(guest: Guest) {
            this.guests = this.guests.filter(
                (g: Guest) => g.id !== guest.id
            );

            if (guest == this.activeGuest && this.guests.length > 0) {
                this.activeGuest = this.guests[0];
            }
        }
    },
    persist: true,
});
