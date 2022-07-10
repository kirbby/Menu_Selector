import { useUserStore } from "@/stores/UserStore";
import supabase from "@/supabaseClient";
import Guest from "@/types/Guest";

export async function getUserGuests(userId: string): Promise<Guest[]> {
    const { data: guests, error } = await supabase
        .from("guests")
        .select("*, guestMenuItems(*, menuItem:menuItems(*)), userGuest:userGuests!inner(*)")
        .eq("userGuest.userId", userId);

    if (error) {
        console.log(error);
    }

    return guests as Guest[];
}

export async function saveGuest(guest: Guest): Promise<Guest> {
    const guestTemp: any = { ...guest };
    delete guestTemp.id;
    delete guestTemp.guestMenuItems;
    delete guestTemp.userGuest;

    const { data: guestNew, error: upsertGuestError } = await supabase
        .from("guests")
        .upsert(guestTemp);

    if (upsertGuestError || !guestNew?.some(Boolean)) {
        console.log(upsertGuestError);
        throw upsertGuestError;
    }

    if (guest.id === 0) {
        const userGuest = {
            userId: useUserStore().getCurrentUser?.id ?? "",
            guestId: guestNew[0].id,
        };

        const { error: upsertUserGuestError } = await supabase
            .from("userGuests")
            .upsert(userGuest, {
                returning: "minimal"
            });

        if (upsertUserGuestError) {
            console.log(upsertUserGuestError);
            throw upsertUserGuestError;
        }
    }

    return guestNew[0];
}

export async function deleteGuest(guest: Guest): Promise<void> {
    await deleteUserGuest(guest);

    await deleteGuestMenuItems(guest);

    const { error: deleteGuestError } = await supabase
        .from("guests")
        .delete()
        .match({ id: guest.id });

    if (deleteGuestError) {
        console.log(deleteGuestError);
        throw deleteGuestError;
    }
}

async function deleteUserGuest(guest: Guest) {
    const { error: deleteUserGuestError } = await supabase
        .from("userGuests")
        .delete()
        .match({ guestId: guest.id });

    if (deleteUserGuestError) {
        console.log(deleteUserGuestError);
        throw deleteUserGuestError;
    }
}

async function deleteGuestMenuItems(guest: Guest) {
    const { error: deleteGuestMenuItemError } = await supabase
        .from("guestMenuItems")
        .delete()
        .match({ guestId: guest.id });

    if (deleteGuestMenuItemError) {
        console.log(deleteGuestMenuItemError);
        throw deleteGuestMenuItemError;
    }
}

