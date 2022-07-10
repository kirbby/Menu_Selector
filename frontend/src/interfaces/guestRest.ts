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
    delete guest.guestMenuItems;
    delete guest.userGuest;

    const { data: guestNew, error: upsertError } = await supabase
        .from("guest")
        .upsert(guest);

    if (upsertError || !guestNew?.some(Boolean)) {
        console.log(upsertError);
        throw upsertError;
    }

    return guestNew[0];
}
