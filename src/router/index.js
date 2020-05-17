import Vue from "vue";
import VueRouter from "vue-router";
import BaseView from "../views/BaseView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: BaseView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
