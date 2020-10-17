import Vue from "vue";
import VueRouter from "vue-router";

import HomeView from "../views/HomeView.vue";

import PostView from "../views/PostView.vue";
import PostArticle from "../views/PostArticle.vue";
import PostList from "../views/PostList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/dev/post",
    component: PostView,
    children: [
      {
        path: "article",
        alias: "/docs/*",
        component: PostArticle
      },
      {
        path: "list",
        alias: ["/tags/*", "/categories/*"],
        component: PostList
      }
    ]
  },
  {
    path: "*",
    component: HomeView
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    // console.log("router scrollBehavior:", to, from, savedPosition);
    if (to.hash) return { selector: to.hash };
    else if (savedPosition) return savedPosition;
    else return { x: 0, y: 0 };
  }
});

export default router;
