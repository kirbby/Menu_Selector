import { getUser } from "@/interfaces/userRest";
import User from "@/types/User";
import { User as GoTrueClientUser } from "@supabase/supabase-js";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => ({
        currentUser: {} as User | null,
        currentUserData: {} as GoTrueClientUser | null,
        projectId: "",
    }),
    getters: {
        getCurrentUser(state): User | null {
            return state.currentUser;
        },
        getCurrentUserData(state): GoTrueClientUser | null {
            return state.currentUserData;
        },
        getProjectId(state): string {
            return state.projectId;
        }
    },
    actions: {
        async loadCurrentUser() {
            await getUser(this.currentUser?.id ?? "");
        },
        async resetProjectId() {
            this.projectId = "";
        }
    },
    persist: true,
});
