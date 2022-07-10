import { getUserGuests } from "@/interfaces/guestRest";
import { saveGuestMenuItem } from "@/interfaces/menuRest";
import Guest from "@/types/Guest";
import GuestMenuItem from "@/types/GuestMenuItems";
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

                return currentGuest.guestMenuItems.find((guestMenuItem: GuestMenuItem) => guestMenuItem.menuItem?.courseId === courseId)?.id ?? 0;
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
            if (!this.getCurrentGuest?.guestMenuItems.some(x => x.menuItem?.id === menuItem.id)) {
                const currentGuest = this.getCurrentGuest;

                if (!currentGuest) {
                    return;
                }

                currentGuest.guestMenuItems = currentGuest.guestMenuItems.filter(
                    x => x.menuItem?.courseId !== menuItem.courseId
                );

                const index = currentGuest.guestMenuItems.findIndex(x => x.menuItem?.courseId === menuItem.courseId);
                if (index > -1) {
                    const updatedGuestMenuItem = currentGuest.guestMenuItems[index];

                    updatedGuestMenuItem.menuItem = menuItem;
                    currentGuest.guestMenuItems[index] = updatedGuestMenuItem;
                } else {
                    const newGuestMenuItem = {
                        id: 0,
                        guestId: currentGuest.id,
                        menuItemId: menuItem.id,
                    };

                    currentGuest.guestMenuItems.push(newGuestMenuItem);
                }

                saveGuestMenuItem(menuItem, currentGuest.id);
            }
        },
        async loadCurrentUserGuests() {
            this.guests = await getUserGuests(useUserStore().getCurrentUser?.id ?? "");
            this.currentGuest = undefined;
        }
    },
    persist: true,
});
