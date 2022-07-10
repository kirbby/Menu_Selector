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
