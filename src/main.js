import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
//import LoadScript from "vue-plugin-load-script";
Vue.config.productionTip = false;
// Vue.use(LoadScript);
// Vue.loadScript("https://apis.google.com/js/platform.js");

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
