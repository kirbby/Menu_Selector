import { definitions } from "./supabase";

interface User {
    user: definitions["users"]
    roles: definitions["roles"][]
    guests: definitions["guests"][]
}

export default User;
