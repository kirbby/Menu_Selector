import { useGuestStore } from "./../stores/GuestStore";
import axios from "axios";
import MenuItem from "@/types/MenuItem";
import supabase from "@/supabaseClient";

export async function getMenuItems(courseId: number): Promise<MenuItem[]> {
    const { data: MenuItems, error } = await supabase
        .from<MenuItem>("MenuItems")
        .select("*")
        .eq("courseId", courseId);

    if (error) {
        console.log(error);
    }

    return MenuItems ?? [];

    /* return [
        {
            id: 1,
            name: "Ramen",
            description:
                "A Japanese noodle soup dish consisting of Chinese-style wheat noodles served in a meat- or (occasionally) fish-based broth, often flavored with soy sauce or miso, and uses toppings such as sliced pork, dried seaweed, kamaboko, and green onions.",
            image: "data:image/jpeg;base64,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",
            courseId: 1,
        },
        {
            id: 2,
            name: "Sushi",
            description:
                "Sushi is a Japanese dish of cooked rice that is usually served with raw fish, vegetables, or other ingredients such as sesame seeds, as well as other ingredients such as rice, seaweed, and sugar.",
            image: "https://www.sushideluxe.eu/media/catalog/product/cache/1/image/650x/040ec09b1e35df139433887a97daa66f/_/m/_mg_6612_neu_650px.jpg",
            courseId: 1,
        },
        {
            id: 3,
            name: "Pizza",
            description:
                "Pizza is a savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and often various other ingredients baked at a high temperature, traditionally in a wood-fired oven.",
            image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F19%2F2014%2F07%2F10%2Fpepperoni-pizza-ck-x.jpg&q=60",
            courseId: 2,
        },
    ].filter(item => item.courseId === courseId); */
}

export function saveMenu() {
    const guestStore = useGuestStore();
    const guests = guestStore.getGuests;

    return axios.post("/api/guests", {
        items: guests,
    });
}
