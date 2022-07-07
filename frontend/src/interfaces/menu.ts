import { useGuestStore } from "./../stores/GuestStore";
import axios from "axios";
import supabase from "@/supabaseClient";
import MenuItem from "@/types/MenuItem";

export async function getMenuItems(courseId: number): Promise<MenuItem[]> {
    const { data: MenuItems, error } = await supabase
        .from<MenuItem>("menuItems")
        .select("*, course:courses!inner(*)")
        .eq("courseId", courseId);

    if (error) {
        console.log(error);
    }

    return MenuItems ?? [];
}

export function saveMenu() {
    const guestStore = useGuestStore();
    const guests = guestStore.getGuests;

    return axios.post("/api/guests", {
        items: guests,
    });
}
