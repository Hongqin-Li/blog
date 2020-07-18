import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import PostArticle from "../views/PostArticle.vue";
import PostList from "../views/PostList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/docs/*",
    component: PostArticle
  },
  {
    path: "/tags/*",
    component: PostList
  },
  {
    path: "/categories/*",
    component: PostList
  },
  {
    path: "*",
    component: HomeView
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
