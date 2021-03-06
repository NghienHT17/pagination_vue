import {createRouter, createWebHistory} from "vue-router";
const routes=[

    {
        path:"/add",
        name:"add",
        component: import("./components/AddStudent")
    },
    {
        path:"/students/:id",
        name:"student-details",
        component: import("./components/Student")
    },
    {   path:"/",
        alias:"/getByPaging",
        name:"paging-list",
        component: import("./components/PagingList")
    }


];
const router = createRouter({
    history: createWebHistory(),
        routes
});
export default router;