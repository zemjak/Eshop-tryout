<script>

import {useStore} from "vuex";
import {computed} from "vue";

export default {
  setup() {
    const store = useStore()

    const activePage = computed(() => store.state.activePage)
    const cartSize = computed(() => {
      let sum = 0
      store.state.cart.forEach((value, key) => {
        sum += Number(value)
      })
      return sum
    })
    const updateOrderBy = (orderType) => {
      store.commit("setOrderBy", orderType)
    }
    const setActivePage = (activePage) => {
      store.commit("setActivePage", activePage)
    }

    return {
      activePage,
      cartSize,
      updateOrderBy,
      setActivePage
    };
  }
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light navbar-dark bg-dark shadow p-3 mb-5 rounded-bottom">
    <a class="navbar-brand" href="#">Simple e-shop</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li v-if="activePage === 'Home'" class="nav-item active">
          <router-link class="nav-link" to="/" @click="setActivePage('Home')">Home <span class="sr-only">(current)</span></router-link>
        </li>
        <li v-else class="nav-item">
          <router-link class="nav-link" to="/" @click="setActivePage('Home')">Home <span class="sr-only">(current)</span></router-link>
        </li>
        <li v-if="activePage === 'Wishlist'" class="nav-item active">
          <router-link class="nav-link" to="/wishlist" @click="setActivePage('Wishlist')">Wishlist</router-link>
        </li>
        <li v-else class="nav-item">
          <router-link class="nav-link" to="/wishlist" @click="setActivePage('Wishlist')">Wishlist</router-link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Order by
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <a class="dropdown-item" @click="updateOrderBy('Name')">Name</a>
            <a class="dropdown-item" @click="updateOrderBy('Price')">Price</a>
            <a class="dropdown-item" @click="updateOrderBy('Sale')">Sale</a>
          </div>
        </li>
        <li>
          <button v-if="activePage === 'Cart'" type="button" class="btn btn-primary active">
            <router-link class="nav-link" to="/cart" @click="setActivePage('Cart')">Cart <span class="badge badge-light">{{ cartSize }}</span></router-link>
          </button>
          <button v-else type="button" class="btn btn-primary">
            <router-link class="nav-link" to="/cart" @click="setActivePage('Cart')">Cart <span class="badge badge-light">{{ cartSize }}</span></router-link>
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>

</style>