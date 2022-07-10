import { getUserGuests, saveGuest } from "@/interfaces/guestRest";
import { saveGuestMenuItem } from "@/interfaces/menuRest";
import Guest from "@/types/Guest";
import GuestMenuItem from "@/types/GuestMenuItem";
import MenuItem from "@/types/MenuItem";
import { defineStore } from "pinia";
import { useUserStore } from "./UserStore";

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

                return currentGuest.guestMenuItems?.find((guestMenuItem: GuestMenuItem) => guestMenuItem.menuItem?.courseId === courseId)?.menuItemId ?? 0;
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
        async addGuest(name: string) {
            let newGuest: Guest = {
                id: 0,
                name: name,
            };

            newGuest = await saveGuest(newGuest);

            this.guests.push(newGuest);
            this.currentGuest = newGuest;
        },
        async changeGuestMenu(menuItem: MenuItem) {
            const currentGuest = this.getCurrentGuest;

            if (!currentGuest) {
                return;
            }

            if (await saveGuestMenuItem(menuItem, currentGuest.id)) {
                this.loadCurrentUserGuests();
            }
        },
        async loadCurrentUserGuests() {
            this.guests = await getUserGuests(useUserStore().getCurrentUser?.id ?? "");

            if (this.guests.some(Boolean)) {
                this.currentGuest = this.guests[0];
            } else {
                this.currentGuest = undefined;
            }
        }
    },
    persist: true,
});
