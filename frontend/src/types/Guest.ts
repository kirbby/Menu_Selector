import MenuItem from "./MenuItem";
import { definitions } from "./supabase";

type Guest = definitions["guests"] & { selectedMenuItems: MenuItem[] };

export default Guest;
