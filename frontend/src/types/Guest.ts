import MenuItem from "./MenuItem";

interface Guest {
    id: number;
    name: string;
    email: string;
    selectedMenus: MenuItem[];
}

export default Guest;
