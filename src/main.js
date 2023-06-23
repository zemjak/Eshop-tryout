import './assets/main.css'

import {createApp, reactive, ref} from 'vue'
import App from './App.vue'
import router from "@/router";
import {createStore} from "vuex";

const store = createStore({
    state() {
        return {
            apiUrl: "https://9gn9bc16qc.execute-api.eu-central-1.amazonaws.com/beta",
            isLoading: ref(true),
            productList: ref([]),
            cart: ref(new Map()),
            orderBy: ref("Name"),
            wishlist: ref(new Set())
        };
    },
    mutations: {
        setOrderBy(state, orderType) {
            state.orderBy = orderType

            if (state.orderBy === "Price") {
                state.productList = state.productList.sort((a, b) => {
                    return a.price - b.price
                })
            } else if (state.orderBy === "Sale") {
                state.productList = state.productList.sort((a, b) => {
                    return b.discount - a.discount
                })
            } else {
                state.productList = state.productList.sort((a, b) => {
                    return a.name.localeCompare(b.name)
                })
            }
            console.log(state.productList)
        },
        setLoading(state, loading) {
            state.isLoading = loading
        },
        setProductList(state, list) {
            state.productList = list
        },
        addToWishlist(state, itemInfo) {
            state.wishlist.add(itemInfo)
        },
        removeFromWishlist(state, itemInfo) {
            state.wishlist.delete(itemInfo)
        }
    },
    actions: {
        async fetchData(context) {
            context.commit('setLoading', true)
            await fetch(context.state.apiUrl + '/all') //{"body": JSON.stringify({"orderType": orderBy})})
                .then(response => response.json())
                .then(jsonData => {
                    context.commit('setProductList', jsonData);
                    context.commit('setLoading', false);
                })
                .catch(error => {
                    console.error(error);
                    context.commit('setLoading', false);
                })
        }
    },
    getters: {
        isItemInWishlist: (state) => (itemInfo) => {
            return state.wishlist.has(itemInfo)
        }
    }
});

createApp(App).use(store).use(router).mount('#app')
