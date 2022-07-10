import supabase from "@/supabaseClient";
import MenuItem from "@/types/MenuItem";
import { definitions } from "@/types/supabase";

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

export async function saveGuestMenuItem(menuItem: MenuItem, guestId: number): Promise<boolean> {
    const { data: guestMenuItem } = await supabase
        .from<definitions["guestMenuItems"]>("guestMenuItems")
        .select("*")
        .eq("guestId", guestId)
        .eq("menuItemId", menuItem.id);

    /*     if (!guestMenuItem) {
        guestMenuItem = {
            guestId: guestId,
            menuItemId: menuItem.id,
        };
    } */

    const { data, error: error } = await supabase
        .from<definitions["guestMenuItems"]>("guestMenuItems")
        .upsert(menuItem);

    if (error) {
        console.log(error);
    }

    return true;
}
