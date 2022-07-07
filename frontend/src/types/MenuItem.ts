import Course from "./Course";
import { definitions } from "./supabase";

type MenuItem = definitions["menuItems"] & { course: Course };

export default MenuItem;
