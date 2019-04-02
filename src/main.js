import Vue from "vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import VueRouter from "vue-router";
import router from "./router";

Vue.use(VueRouter);
Vue.config.productionTip = false;
Vue.prototype.$http = axios;

new Vue({
  router
}).$mount("#app");
