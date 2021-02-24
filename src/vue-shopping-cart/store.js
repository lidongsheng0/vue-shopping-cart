import Vue from 'vue';
import Vuex from 'vuex';
import cloudbase from '@cloudbase/js-sdk';
import router from './router';

Vue.use(Vuex);

const app = cloudbase.init({
	env: "react-7g8aw28zdd8bc18f",
});

const auth = app.auth({
	persistence: "local",
});

const db = app.database();

export default new Vuex.Store({
	state: {
		user: null,
		products: [],
	},
	actions: {
		doSignUpWithEmailAndPassword(context,{ email, password }) {
			auth.signUpWithEmailAndPassword(email, password)
				.then(() => {
					router.push("/");
				})
				.catch((error) => {
					console.log(error);
				});
		},
		doSignInWithEmailAndPassword({ commit }, { email, password }) {
			auth.signInWithEmailAndPassword(email, password)
				.then(() => {
					commit("setUser", auth.currentUser);

					router.push("/home");
				})
				.catch((error) => {
					console.log(error);
				});
		},
        doUpdateUserName(context,name) {
            console.log(name);
            auth.isUsernameRegistered(name)
            .then((registered) => {
				if(!registered) {
                    auth.currentUser.updateUsername(name).catch((error) => {
						console.log(error);
					});
                }
			})
            .catch((error) => {
                console.log(error);
            });
            
        },
        doSignOut({ commit }) {
            auth.signOut();
            commit('setUser',null);
            router.push("/");
        },
        doUpdateUserInfo(context,{nickName,gender,country,province,city}) {
            auth.currentUser.update({
                nickName,
                gender,
                country,
                province,
                city,
            }).catch((error) => {
                console.log(error);
            })
        },
		getProducts({ commit }) {
			db.collection("products")
				.get()
				.then((res) => {
					commit("setProducts", res.data[0].products);
				});
		},
	},
	mutations: {
		setUser(state, user) {
			state.user = user;
		},
		setProducts(state, products) {
			state.products = products;
		},
	},
	getters: {
		sortProducts(state) {
            // sort会改变原数组,对 products进行一个拷贝
            const products = [...state.products];
            console.log(products);
			return function(select) {
                
                if(select.length<4) {
                     return products.filter(
							(product) =>
								product.availableSizes.indexOf(select) !== -1
						);
                }else {
                    switch (select) {
						case "lowest": {
							return products.sort(
								(productA, productB) =>
									productA.price - productB.price
							);
						}
						case "highest": {
							return products.sort(
								(productA, productB) =>
									productB.price - productA.price
							);
						}
						default:
							return state.products;
					}
                }
            }
		},
    }
});