<script>

import {useStore} from "vuex";

export default {
  setup() {
    const store = useStore()

    const cart = store.state.cart
    const cartSize = () => {
      let sum = 0
      cart.forEach((value, key) => {
        sum += value
      })
      return sum
    }
    const updateOrderBy = (orderType) => {
      store.commit("setOrderBy", orderType)
    }

    return {
      cart,
      cartSize,
      updateOrderBy
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
        <li class="nav-item active">
          <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/wishlist">Wishlist</router-link>
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
          <button type="button" class="btn btn-primary">
            <router-link class="nav-link" to="/cart">Cart <span class="badge badge-light">{{ cartSize() }}</span></router-link>
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>

</style>