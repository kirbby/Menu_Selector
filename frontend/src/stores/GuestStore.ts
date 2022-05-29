import Guest from "@/types/Guest";
import MenuItem from "@/types/MenuItem";
import { defineStore } from "pinia";

export const useGuestStore = defineStore("guest", {
    state: () => ({
        guests: [] as Guest[],
        activeGuestId: "",
    }),
    getters: {
        getGuests(state): Guest[] {
            return state.guests;
        },
        getGuestOnId(state): (id: string) => Guest | undefined {
            return (id: string) =>
                state.guests.find((guest: Guest) => guest.id === id);
        },
        getActiveGuest(state): Guest | undefined {
            return state.guests.find((guest: Guest) => guest.id === state.activeGuestId);;
        }
    },
    actions: {
        deleteGuest(guest: Guest) {
            this.guests = this.guests.filter(
                (g: Guest) => g.id !== guest.id
            );

            if (guest.id == this.activeGuestId && this.guests.length > 0) {
                this.activeGuestId = this.guests[0].id;
            }
        },
        changeGuestMenu(menuItem: MenuItem) {
            if (!this.getActiveGuest?.selectedMenus.includes(menuItem)) {
                const activeGuest = this.getGuestOnId(this.getActiveGuest?.id ?? "");

                if (!activeGuest) {
                    return;
                }

                activeGuest.selectedMenus = activeGuest.selectedMenus.filter(
                    x => x.categoryId !== menuItem.categoryId
                );
                activeGuest.selectedMenus.push(menuItem);
            }            
        }
    },
    persist: true,
});
