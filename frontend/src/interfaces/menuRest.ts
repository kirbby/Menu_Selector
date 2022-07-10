import supabase from "@/supabaseClient";
import GuestMenuItem from "@/types/GuestMenuItem";
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

export async function saveGuestMenuItem(menuItem: MenuItem, guestId: number): Promise<GuestMenuItem> {
    const { data: guestMenuItemOld, error: selectError } = await supabase
        .from("guestMenuItems")
        .select("*, menuItem:menuItems!inner(*)")
        .eq("guestId", guestId)
        .eq("menuItem.courseId", menuItem.courseId);

    if (selectError) {
        console.log(selectError);
        throw selectError;
    }

    const guestMenuItemTemp: GuestMenuItem = guestMenuItemOld?.some(Boolean) ? guestMenuItemOld[0] : {
        guestId: guestId,
    } as GuestMenuItem;
    guestMenuItemTemp.menuItemId = menuItem.id;
    delete guestMenuItemTemp.menuItem;

    const { data: guestMenuItemNew, error: upsertError } = await supabase
        .from<definitions["guestMenuItems"]>("guestMenuItems")
        .upsert(guestMenuItemTemp);

    if (upsertError || !guestMenuItemNew?.some(Boolean)) {
        console.log(upsertError);
        throw upsertError;
    }

    return guestMenuItemNew[0];
}
