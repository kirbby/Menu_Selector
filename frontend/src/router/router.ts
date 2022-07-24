import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const HomePage = () => import("@/views/HomePage.vue");
const NotFound = () => import("@/views/NotFound.vue");

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "HomePage",
        component: HomePage,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
