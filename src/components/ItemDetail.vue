<script>

import {computed, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";

export default {
  setup() {
    const store = useStore()
    const route = useRoute()

    const guid = ref("")
    const isLoading = ref(true)
    const shoppingItem = ref()

    onMounted(() => {
      guid.value = route.params.guid

      isLoading.value = true
      fetch(store.state.apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"guid": guid.value})
      })
          .then(response => response.json())
          .then(jsonData => {
            shoppingItem.value = jsonData
            isLoading.value = false
          })
          .catch(error => {
            console.error(error);
            isLoading.value = false
          })
    })

    const countInCart = () => {
      return store.state.cart.has(shoppingItem.value.guid) ? store.state.cart.get(shoppingItem.value.guid) : 0
    }
    const canAddItemIntoCart = () => {
      return (shoppingItem.value.availablePieces > 0) && (countInCart() < shoppingItem.value.availablePieces)
    }
    const isItemInWishlist = (itemInfo) => computed(() => store.getters.isItemInWishlist(itemInfo))
    const isInWishlist = () => {
      return isItemInWishlist(shoppingItem.value).value
    }

    const handleClickAddToCart = () => {
      if (store.state.cart.has(shoppingItem.value.guid)) {
        if (store.state.cart.get(shoppingItem.value.guid) < shoppingItem.value.availablePieces) {
          store.state.cart.set(shoppingItem.value.guid, Number(store.state.cart.get(shoppingItem.value.guid)) + 1)
        }
      } else {
        if (shoppingItem.value.availablePieces > 0) {
          store.state.cart.set(shoppingItem.value.guid, 1)
        }
      }
      store.commit("saveStoreIntoLocalStorage")
    }
    const addToWishlist = () => {
      store.commit("addToWishlist", shoppingItem.value)
      store.commit("saveStoreIntoLocalStorage")
    }
    const removeFromWishlist = () => {
      store.commit("removeFromWishlist", shoppingItem.value)
      store.commit("saveStoreIntoLocalStorage")
    }

    return {
      isLoading,
      shoppingItem,
      canAddItemIntoCart,
      isInWishlist,
      handleClick: handleClickAddToCart,
      addToWishlist,
      removeFromWishlist
    }
  }
}
</script>

<template>
  <div v-if="isLoading" class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  <div v-else class="container">
    <div class="row">
      <div class="col-md-6">
        <img :src="shoppingItem.picture" alt="Product Image" class="img-fluid">
      </div>
      <div class="col-md-6">
        <h2>{{ shoppingItem.name }}</h2>
        <h4>About</h4>
        <p>{{ shoppingItem.about }}</p>
        <p>Price: ${{ shoppingItem.price }}</p>
        <p>Stock: {{ shoppingItem.availablePieces }}</p>
        <p v-if="shoppingItem.discount">Discount: {{ shoppingItem.discount }}%</p>
        <p>Rating: {{ shoppingItem.rating }}/5</p>
        <h4>Tags of product</h4>
        <ul>
          <li v-for="tag in shoppingItem.tags" :key="tag">{{ tag }}</li>
        </ul>

        <a v-if="canAddItemIntoCart()" class="btn btn-primary" @click="handleClick">Add to cart</a>
        <a v-else class="btn btn-primary disabled">Add to cart</a>
        <button v-if="isInWishlist()" class="btn btn-light" type="button" @click="removeFromWishlist">Remove 💖</button>
        <button v-else class="btn btn-light" type="button" @click="addToWishlist">Add to 🤍</button>
      </div>
    </div>
  </div>
</template>
