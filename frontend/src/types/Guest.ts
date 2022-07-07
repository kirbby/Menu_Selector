import { definitions } from "./supabase";

interface Guest {
    user: definitions["users"]
    guest: definitions["guests"]
    selectedMenus: definitions["menuItems"][]
}

export default Guest;
