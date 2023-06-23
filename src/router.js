import {createRouter, createWebHashHistory} from 'vue-router'
import Wishlist from "@/components/Wishlist.vue";
import Home from "@/components/Home.vue";
import Cart from "@/components/Cart.vue";

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
    }
]

const router = createRouter({ history: createWebHashHistory(), routes })
export default router