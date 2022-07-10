import supabase from "@/supabaseClient";
import Course from "@/types/Course";

export async function getCourse(courseId: number): Promise<Course | null> {
    const { data: Course, error } = await supabase
        .from<Course>("courses")
        .select("*")
        .eq("id", courseId)
        .limit(1)
        .single();

    if (error) {
        console.log(error);
    }

    return Course;
}
