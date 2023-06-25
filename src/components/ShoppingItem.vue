<script>
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";

export default {
  props: {
    itemInfo: {
      type: Object,
      required: true,
    }
  },

  setup(props) {
    const store = useStore()

    const cart = computed(() => store.state.cart)
    const wishlist = computed(() => store.state.wishlist)
    const countInCart = () => {
      return store.state.cart.has(props.itemInfo.guid) ? store.state.cart.get(props.itemInfo.guid) : 0
    }
    const handleClickAddToCart = () => {
      if (store.state.cart.has(props.itemInfo.guid)) {
        if (store.state.cart.get(props.itemInfo.guid) < props.itemInfo.availablePieces) {
          store.state.cart.set(props.itemInfo.guid, store.state.cart.get(props.itemInfo.guid) + 1)
        }
      } else {
        if (props.itemInfo.availablePieces > 0) {
          store.state.cart.set(props.itemInfo.guid, 1)
        }
      }
    }
    const canAddItemIntoCart = () => {
      return (props.itemInfo.availablePieces > 0) && (countInCart() < props.itemInfo.availablePieces)
    }
    const isItemInWishlist = (itemInfo) => computed(() => store.getters.isItemInWishlist(itemInfo))
    const isInWishlist = isItemInWishlist(props.itemInfo)
    const addToWishlist = () => {
      store.commit("addToWishlist", props.itemInfo)
    }
    const removeFromWishlist = () => {
      store.commit("removeFromWishlist", props.itemInfo)
    }

    return {
      itemInfo: props.itemInfo,
      handleClick: handleClickAddToCart,
      canAddItemIntoCart,
      countInCart,
      isInWishlist,
      addToWishlist,
      removeFromWishlist
    };
  }
};
</script>

<template>
  <div class="card" style="width: 18rem;">
    <img :src="itemInfo.picture" class="card-img-top" :alt="itemInfo.picture" >
    <div class="card-body">
      <h4 class="card-title">{{ itemInfo.name }}</h4>
      <h5 class="card-title">{{ itemInfo.price }}€</h5>
      <div class="progress">
        <div class="progress-bar" role="progressbar" :style="{ width: ((itemInfo.rating - 1) / 5) * 100 + '%' }"></div>
        <span>Rating: {{ itemInfo.rating }}</span>
      </div>
      <h4 v-if="itemInfo.discount > 0" class="card-title text-danger">Discount {{ itemInfo.discount }}%</h4>
      <h6 class="card-subtitle mb-2 text-muted pt-2">Pieces available: {{ itemInfo.availablePieces - countInCart() }}</h6>
      <a v-if="canAddItemIntoCart()" class="btn btn-primary" @click="handleClick">Add to cart</a>
      <a v-else class="btn btn-primary disabled">Add to cart</a>
      <button v-if="isInWishlist" @click="removeFromWishlist" type="button" class="btn btn-light">Remove 💖</button>
      <button v-else type="button" @click="addToWishlist" class="btn btn-light">Add to 🤍</button>
    </div>
  </div>
</template>

<style scoped>

</style>