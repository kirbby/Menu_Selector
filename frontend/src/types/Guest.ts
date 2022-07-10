import GuestMenuItem from "./GuestMenuItem";
import { definitions } from "./supabase";

type Guest = definitions["guests"] &
            {
                guestMenuItems?: GuestMenuItem[],
                userGuest?: definitions["userGuests"],
            };

export default Guest;
