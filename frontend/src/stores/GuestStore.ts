import Guest from "@/types/Guest";
import MenuItem from "@/types/MenuItem";
import { defineStore } from "pinia";

export const useGuestStore = defineStore("guest", {
    state: () => ({
        guests: [] as Guest[],
        currentGuest: undefined as Guest | undefined,
    }),
    getters: {
        getGuests(state): Guest[] {
            return state.guests;
        },
        getGuestOnId(state): (id: number) => Guest | undefined {
            return (id: number) =>
                state.guests.find((guest: Guest) => guest.id === id);
        },
        getCurrentGuest(state): Guest | undefined {
            return state.currentGuest;
        },
        getCurrentGuestMenuIdOnCourseId(): (courseId: number) => number {
            return (courseId: number) => {
                const currentGuest = this.getCurrentGuest;

                if (!currentGuest) {
                    return 0;
                }

                return currentGuest.selectedMenuItems.find((menuItem: MenuItem) => menuItem.courseId === courseId)?.id ?? 0;
            };
        }
    },
    actions: {
        deleteGuest(guest: Guest) {
            this.guests = this.guests.filter(
                (g: Guest) => g.id !== guest.id
            );

            if (guest.id == this.currentGuest?.id && this.guests.length > 0) {
                this.currentGuest = this.guests[0];
            }
        },
        changeGuestMenu(menuItem: MenuItem) {
            if (!this.getCurrentGuest?.selectedMenuItems.includes(menuItem)) {
                const currentGuest = this.getCurrentGuest;

                if (!currentGuest) {
                    return;
                }

                currentGuest.selectedMenuItems = currentGuest.selectedMenuItems.filter(
                    x => x.courseId !== menuItem.courseId
                );
                currentGuest.selectedMenuItems.push(menuItem);
            }
        }
    },
    persist: true,
});
