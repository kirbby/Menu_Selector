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

export async function saveGuestMenuItem(menuItem: MenuItem, guestId: number): Promise<GuestMenuItem | undefined> {
    const guestMenuItemOld = await getGuestMenuItem(guestId, menuItem?.courseId ?? 0);

    const guestMenuItemTemp: GuestMenuItem = guestMenuItemOld ? guestMenuItemOld : {
        guestId: guestId,
    } as GuestMenuItem;

    guestMenuItemTemp.menuItemId = menuItem.id;
    delete guestMenuItemTemp.menuItem;

    const guestMenuItemNew = await upsertGuestMenuItem(guestMenuItemTemp);

    return await getGuestMenuItemById(guestMenuItemNew?.id);
}

async function upsertGuestMenuItem(guestMenuItem: GuestMenuItem): Promise<GuestMenuItem | undefined> {
    const { data: guestMenuItemNew, error: upsertError } = await supabase
        .from<definitions["guestMenuItems"]>("guestMenuItems")
        .upsert(guestMenuItem);
    debugger;
    if (upsertError || !guestMenuItemNew?.some(Boolean)) {
        console.log(upsertError);
        throw upsertError;
    }

    return guestMenuItemNew?.some(Boolean) ? guestMenuItemNew[0] : undefined;
}

async function getGuestMenuItemById(guestMenuItemId: number | undefined): Promise<GuestMenuItem | undefined> {
    if (!guestMenuItemId) {
        return undefined;
    }

    const { data: guestMenuItem, error } = await supabase
        .from("guestMenuItems")
        .select("*, menuItem:menuItems!inner(*)")
        .eq("id", guestMenuItemId);

    if (error) {
        console.log(error);
        throw error;
    }

    return guestMenuItem?.some(Boolean) ? guestMenuItem[0] : undefined;
}

async function getGuestMenuItem(guestId: number, courseId: number): Promise<GuestMenuItem | undefined> {
    const { data: guestMenuItem, error } = await supabase
        .from("guestMenuItems")
        .select("*, menuItem:menuItems!inner(*)")
        .eq("guestId", guestId)
        .eq("menuItem.courseId", courseId);

    if (error) {
        console.log(error);
        throw error;
    }

    return guestMenuItem?.some(Boolean) ? guestMenuItem[0] : undefined;
}
