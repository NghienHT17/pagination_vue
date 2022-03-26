import {createRouter, createWebHistory} from "vue-router";
const routes=[
    {
        path:"/",
        alias: "/students",
        name:"students",
        component: import("./components/StudentList")

    },
    {
        path:"/add",
        name:"add",
        component: import("./components/AddStudent")
    },
    {
        path:"/:id",
        name:"student-details",
        component: import("./components/Student")
    }

];
const router = createRouter({
    history: createWebHistory(),
        routes
});
export default router;