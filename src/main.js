import './assets/main.css'

import {createApp, ref} from 'vue'
import App from './App.vue'
import router from "@/router";
import {createStore} from "vuex";

const store = createStore({
    state() {
        return {
            apiUrl: "https://9gn9bc16qc.execute-api.eu-central-1.amazonaws.com/beta",
            activePage: ref("Home"),
            isLoading: ref(true),
            productList: ref([]),  // List<ItemObject>
            orderBy: ref("Name"),
            cart: ref(new Map()),       // Map<String, Number> - map ItemObject guid to number of items
            wishlist: ref(new Set())    // Set<String> - ItemObject guid
        };
    },
    mutations: {
        saveStoreIntoLocalStorage(state) {
            localStorage.setItem('cart', JSON.stringify(Array.from(state.cart.entries())))
            localStorage.setItem('wishlist', JSON.stringify(Array.from(state.wishlist)))
        },
        initialiseStore(state) {
            if (localStorage.getItem('cart')) {
                state.cart = new Map(JSON.parse(localStorage.getItem("cart")))
            }
            if (localStorage.getItem('wishlist')) {
                state.wishlist = new Set(JSON.parse(localStorage.getItem('wishlist')))
            }
        },
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
        },
        setLoading(state, loading) {
            state.isLoading = loading
        },
        setProductList(state, list) {
            state.productList = list
        },
        addToWishlist(state, itemInfo) {
            state.wishlist.add(itemInfo.guid)
        },
        removeFromWishlist(state, itemInfo) {
            state.wishlist.delete(itemInfo.guid)
        },
        setActivePage(state, activePage) {
            state.activePage = activePage
        },
        deleteCart(state) {
            state.cart = ref(new Map())
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
            return state.wishlist.has(itemInfo.guid)
        },
        filterItemsIntoWishList(state) {
            return state.productList.filter(item => state.wishlist.has(item.guid))
        },
        filterItemsIntoCartList(state) {
            const keys = new Set(state.cart.keys())
            return state.productList.filter(item => keys.has(item.guid))
        }
    }
});

createApp({
    extends: App,
    beforeCreate() {
        this.$store.commit("initialiseStore")
    }
}).use(store).use(router).mount('#app')
