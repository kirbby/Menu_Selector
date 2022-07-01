import { User } from "@supabase/supabase-js";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => ({
        currentUser: {} as User | null
    }),
});
