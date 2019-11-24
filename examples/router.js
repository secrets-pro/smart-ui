import VueRouter from "vue-router";
import Vue from "vue";
import home from "./home.vue";
import ionic from "./components/ionic.vue";
import input from "./components/input.vue";

import select from "./components/select.vue";
import alert from "./components/alert.vue";
import label from "./components/label.vue";
import status from "./components/status.vue";
import button from "./components/button.vue";

Vue.use(VueRouter);
const router = new VueRouter({
  mode: "hash",
  routes: [
    {
      path: "/",
      meta: {
        title: "home"
      },
      component: home
    },
    {
      path: "/ionic",
      meta: {
        title: "ionic"
      },
      component: ionic
    },
    {
      path: "/input",
      meta: {
        title: "input"
      },
      component: input
    },
    {
      path: "/select",
      meta: {
        title: "select"
      },
      component: select
    },
    {
      path: "/alert",
      meta: {
        title: "alert"
      },
      component: alert
    },
    {
      path: "/label",
      meta: {
        title: "label"
      },
      component: label
    },
    {
      path: "/status",
      meta: {
        title: "status"
      },
      component: status
    },
    {
      path: "/button",
      meta: {
        title: "button"
      },
      component: button
    }
  ]
});
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "nmsl";
  next();
});
export default router;
