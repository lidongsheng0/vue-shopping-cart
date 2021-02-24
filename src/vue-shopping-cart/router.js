import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import Home from './page/Home';
import SignIn from './page/SignIn';
import SignUp from './page/SignUp';
import store from './store';
import Account from './page/Account'

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		component: App,
		children: [
			{
				path: "",
				component: SignIn,
				beforeEnter: (to, from, next) => {
					if (store.state.user) {
						next("/home");
					} else {
						next();
					}
				},
			},
			{
				path: "/home",
				component: Home,
				beforeEnter: function(to, from, next) {
					if (!store.state.user) {
						next("/");
					} else {
						next();
					}
				},
			},
			{ path: "/signup", component: SignUp },
			{
				path: "/account",
				component: Account,
				beforeEnter: function(to, from, next) {
					if (!store.state.user) {
						next("/");
					} else {
						next();
					}
				},
			},
		],
	},
];


export default new VueRouter({
	mode: "history",
	routes,
});
