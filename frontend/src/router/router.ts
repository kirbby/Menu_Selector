import {
    createRouter,
    createWebHashHistory,
    RouteRecordRaw
} from "vue-router";

const HomePage = () => import("@/views/HomePage.vue");
const MenuAdminPage = () => import("@/views/MenuAdminPage.vue");
const NotFound = () => import("@/views/NotFound.vue");

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "HomePage",
        component: HomePage,
    },
    {
        path: "/MenuAdmin",
        name: "MenuAdminPage",
        component: MenuAdminPage,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
