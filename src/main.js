import Vue from "vue";
import App from "./App.vue";

import { createVuetify, useVuetify } from "@/plugins/vuetify";
import "./assets/css/global.css";
import "@fontsource/roboto";
import "@fontsource/roboto-mono/400.css";

Vue.config.productionTip = false;

useVuetify(Vue);

new Vue({
	vuetify: createVuetify(),
	render: h => h(App)
}).$mount("#app");
