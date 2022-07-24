import { User as GoTrueClientUser } from "@supabase/supabase-js";
import Guest from "./Guest";
import Project from "./Project";
import Role from "./Role";
import { definitions } from "./supabase";

type User = definitions["users"]
            & {
                roles: Role[],
                guests: Guest[],
                projects: Project[],
                userData: GoTrueClientUser,
            };

export default User;
