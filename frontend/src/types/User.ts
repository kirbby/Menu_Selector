import Guest from "./Guest";
import Role from "./Role";
import { definitions } from "./supabase";

type User = definitions["users"]
            & {
                roles: Role[],
                guests: Guest[]
            };

export default User;
