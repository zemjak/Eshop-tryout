import {createRouter, createWebHistory} from 'vue-router'
import Wishlist from "@/components/Wishlist.vue";
import Home from "@/components/Home.vue";
import Cart from "@/components/Cart.vue";
import ItemDetail from "@/components/ItemDetail.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/wishlist',
        name: 'Wishlist',
        component: Wishlist
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart
    },
    {
        path: '/itemDetail/:guid',
        name: 'ItemDetail',
        component: ItemDetail
    }
]

const router = createRouter({history: createWebHistory(), routes})
export default router