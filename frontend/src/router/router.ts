import {
    createRouter,
    createWebHashHistory,
    RouteRecordRaw
} from "vue-router";

const HomePage = () => import("@/views/HomePage.vue");
const MenuAdminPage = () => import("@/views/MenuAdminPage.vue");
const AuthenticationPage = () => import("@/views/AuthenticationPage.vue");
const NotFound = () => import("@/views/NotFound.vue");

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "HomePage",
        component: HomePage,
        props: ({ params }) => ({
            projectId: params.projectId?.toString()
        }),
    },
    {
        path: "/MenuAdmin",
        name: "MenuAdminPage",
        component: MenuAdminPage,
    },
    {
        path: "/Login",
        name: "AuthenticationPage",
        component: AuthenticationPage,
        props: ({ params }) => ({
            projectId: params.projectId?.toString()
        }),
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
