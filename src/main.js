import Vue from "vue";
import ElementUI from "element-ui";
import store from "./store";
import axios from "axios";
import router from "./router";
import App from "./App.vue";
import "./assets/css/index.scss";

Vue.prototype.axios = axios;

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
