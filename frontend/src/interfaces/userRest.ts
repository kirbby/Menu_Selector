import supabase from "@/supabaseClient";
import { definitions } from "@/types/supabase";
import User from "@/types/User";

export async function getUser(userId: string): Promise<User | null> {
    const { data: User, error } = await supabase
        .from<User>("users")
        .select("*, projects:projects!inner(*)")
        .eq("id", userId)
        .limit(1)
        .single();

    if (error) {
        console.log(error);
    }

    return User;
}

export async function upsertUserProject(userId: string, projectId: string): Promise<boolean> {
    const userProject = {
        userId: userId,
        projectId: projectId,
    };
    const { error: error } = await supabase
        .from<definitions["userProjects"]>("userProjects")
        .upsert(userProject);

    if (error) {
        console.log(error);
    }

    return true;
}
