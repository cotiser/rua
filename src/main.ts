import App from "./App.vue";
/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import axios from "axios";
import VueAxios from "vue-axios";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* add supreme scss stylesheet */
//import "element-plus/theme-chalk/dark/css-vars.css";
import "element-plus/theme-chalk/el-loading.css";
import "element-plus/theme-chalk/el-message.css";
import "element-plus/theme-chalk/el-notification.css";
import "element-plus/theme-chalk/el-message-box.css";
import "@/styles/index.scss";

import router from "@/router";

import {
  onRequestFulfilled,
  onRequestRejected,
  onResponseFulfilled,
  onResponseRejected,
} from "@/utils/interceptor";

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(VueAxios, axios);

// -----------------Axios 配置------------------

axios.defaults.baseURL = import.meta.env.VITE_API_ENTRY;
axios.interceptors.request.use(onRequestFulfilled, onRequestRejected);
axios.interceptors.response.use(onResponseFulfilled, onResponseRejected);

axios.defaults.maxRedirects = 0; // Set to 0 to prevent automatic redirects

axios.defaults.withCredentials = true;

// ---------------------------------------------

import "@/utils/mqtt";

// In composition API setup we can't use "this", you should use provide API to share the globally instance properties first, then use inject API to inject axios to setup
app.provide("axios", app.config.globalProperties.axios);

import("@fortawesome/free-solid-svg-icons").then((module) => {
  const { fas } = module;
  /* add icons to the library */
  library.add(fas);
  app.component("font-awesome-icon", FontAwesomeIcon);
  app.mount("#app");
});
