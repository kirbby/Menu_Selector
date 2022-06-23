import Guest from "@/types/Guest";
import MenuItem from "@/types/MenuItem";
import { defineStore } from "pinia";

export const useGuestStore = defineStore("guest", {
    state: () => ({
        guests: [] as Guest[],
        activeGuestId: 0,
    }),
    getters: {
        getGuests(state): Guest[] {
            return state.guests;
        },
        getGuestOnId(state): (id: number) => Guest | undefined {
            return (id: number) =>
                state.guests.find((guest: Guest) => guest.id === id);
        },
        getActiveGuest(state): Guest | undefined {
            return state.guests.find((guest: Guest) => guest.id === state.activeGuestId);
        },
        getActiveGuestMenuIdOnCourseId(): (courseId: number) => number {
            return (courseId: number) => {
                const activeGuest = this.getActiveGuest;

                if (!activeGuest) {
                    return 0;
                }

                return activeGuest.selectedMenus.find((menuItem: MenuItem) => menuItem.courseId === courseId)?.id ?? 0;
            };
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
                const activeGuest = this.getActiveGuest;

                if (!activeGuest) {
                    return;
                }

                activeGuest.selectedMenus = activeGuest.selectedMenus.filter(
                    x => x.courseId !== menuItem.courseId
                );
                activeGuest.selectedMenus.push(menuItem);
            }
        }
    },
    persist: true,
});
