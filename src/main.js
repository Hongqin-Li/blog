import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueGtag from "vue-gtag";

import "./scss/normalize.scss";
import cfg from "./obj/config.json";

Vue.config.productionTip = false;

Vue.use(
  VueGtag,
  {
    enabled: process.env.NODE_ENV === "production",
    config: { id: cfg["google-analytics"]["id"] }
  },
  router
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
