import MenuItem from "./MenuItem";
import { definitions } from "./supabase";

type GuestMenuItem = definitions["guestMenuItems"] &
            {
                menuItem?: MenuItem
            };

export default GuestMenuItem;

