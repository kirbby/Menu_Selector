import { useGuestStore } from "./../stores/GuestStore";
import axios from "axios";

export function getMenuItems() {
    return [
        {
            id: "1",
            name: "Ramen",
            description:
                "A Japanese noodle soup dish consisting of Chinese-style wheat noodles served in a meat- or (occasionally) fish-based broth, often flavored with soy sauce or miso, and uses toppings such as sliced pork, dried seaweed, kamaboko, and green onions.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Soy_ramen.jpg/220px-Soy_ramen.jpg",
        },
        {
            id: "2",
            name: "Sushi",
            description:
                "Sushi is a Japanese dish of cooked rice that is usually served with raw fish, vegetables, or other ingredients such as sesame seeds, as well as other ingredients such as rice, seaweed, and sugar.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Soy_ramen.jpg/220px-Soy_ramen.jpg",
        },
    ];
}

export function saveMenu() {
    const guestStore = useGuestStore();
    const guests = guestStore.getGuests;

    return axios.post("/api/guests", {
        items: guests,
    });
}
