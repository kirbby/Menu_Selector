import MenuItem from "./MenuItem";

export default interface Guest {
    id: string;
    name: string;
    email: string;
    selectedMenus: MenuItem[];
}
