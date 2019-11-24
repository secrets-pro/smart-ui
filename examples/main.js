import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import smUI from "../dist/sm-ui.esm.js";
// import "../dist/styles/sm-ui.css";
import smUI from "@/";
import "@/styles/index.less";
Vue.use(smUI);
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
