import Vue from "vue";
import VueRouter from "vue-router";
import DocView from "../views/DocView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/docs/*",
    component: DocView
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
