import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        redirect: "index",
        children: [
            {
                path: "index",
                name: "index",
                component: () => import("../views/home/index.vue"),
                meta: {
                    title: "智慧社区",
                    requireAuth: true // 判断是否需要登录
                }
            },
            {
                path: "communityManagement",
                name: "communityManagement",
                component: () =>
                    import("../views/communityManagement/index.vue"),
                meta: {
                    title: "社区管理",
                    requireAuth: true // 判断是否需要登录
                }
            },
            {
                path: "smartPartyBuilding",
                name: "smartPartyBuilding",
                component: () =>
                    import("../views/smartPartyBuilding/index.vue"),
                meta: {
                    title: "智慧党建",
                    requireAuth: true // 判断是否需要登录
                }
            },
            {
                path: "intelligentSecurity",
                name: "intelligentSecurity",
                component: () =>
                    import("../views/intelligentSecurity/index.vue"),
                meta: {
                    title: "智能安防",
                    requireAuth: true // 判断是否需要登录
                }
            },
            {
                path: "comprehensiveControl",
                name: "comprehensiveControl",
                component: () =>
                    import("../views/comprehensiveControl/index.vue"),
                meta: {
                    title: "综合治理",
                    requireAuth: true // 判断是否需要登录
                }
            }
        ]
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../views/login.vue"),
        meta: {
            title: "智慧社区"
        }
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.VUE_APP_NAME,
    routes
});

export default router;

// 判断是否登录，如果未登录就跳转到登录页
// router.beforeEach((to, from, next) => {
//     //设置每个页面的title
//     if (to.meta.title) {
//         document.title = to.meta.title;
//     }
//     // 判断是否登录
//     if (to.meta.requireAuth) {
//         const token = sessionStorage.getItem("userToken");
//         if (token === "null" || token === null || token === "") {
//             next({
//                 path: "/login"
//             });
//         } else {
//             next();
//         }
//     } else if (to.meta.requireAuth === undefined && to.path !== "/login") {
//         next({
//             path: "/login"
//         });
//     } else {
//         next();
//     }
// });
