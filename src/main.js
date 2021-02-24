import Vue from "vue";
import { App, store, router } from "./vue-shopping-cart";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "default-passive-events";

Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
	router,
	store: store,
	render: (h) => h(App),
}).$mount("#app");
