<script>
import {computed} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export default {
  props: {
    itemInfo: {
      type: Object,
      required: true,
    }
  },

  setup(props) {
    const store = useStore()
    const router = useRouter()

    const goToRoute = () => {
      router.push("/itemDetail/" + props.itemInfo.guid)
    }

    const countInCart = () => {
      return store.state.cart.has(props.itemInfo.guid) ? store.state.cart.get(props.itemInfo.guid) : 0
    }
    const handleClickAddToCart = () => {
      if (store.state.cart.has(props.itemInfo.guid)) {
        if (store.state.cart.get(props.itemInfo.guid) < props.itemInfo.availablePieces) {
          store.state.cart.set(props.itemInfo.guid, Number(store.state.cart.get(props.itemInfo.guid)) + 1)
        }
      } else {
        if (props.itemInfo.availablePieces > 0) {
          store.state.cart.set(props.itemInfo.guid, 1)
        }
      }
      store.commit("saveStoreIntoLocalStorage")
    }
    const canAddItemIntoCart = () => {
      return (props.itemInfo.availablePieces > 0) && (countInCart() < props.itemInfo.availablePieces)
    }
    const isItemInWishlist = (itemInfo) => computed(() => store.getters.isItemInWishlist(itemInfo))
    const isInWishlist = isItemInWishlist(props.itemInfo)
    const addToWishlist = () => {
      store.commit("addToWishlist", props.itemInfo)
      store.commit("saveStoreIntoLocalStorage")
    }
    const removeFromWishlist = () => {
      store.commit("removeFromWishlist", props.itemInfo)
      store.commit("saveStoreIntoLocalStorage")
    }

    return {
      itemInfo: props.itemInfo,
      handleClick: handleClickAddToCart,
      canAddItemIntoCart,
      countInCart,
      isInWishlist,
      addToWishlist,
      removeFromWishlist,
      goToRoute
    };
  }
};
</script>

<template>
  <div class="card" style="width: 18rem;">
    <img :alt="itemInfo.picture" :src="itemInfo.picture" class="card-img-top" @click="goToRoute">
    <div class="card-body">
      <h4 class="card-title">{{ itemInfo.name }}</h4>
      <h5 class="card-title">{{ itemInfo.price }}€</h5>
      <div class="progress">
        <div :style="{ width: ((itemInfo.rating - 1) / 5) * 100 + '%' }" class="progress-bar" role="progressbar"></div>
        <span>Rating: {{ itemInfo.rating }}</span>
      </div>
      <h4 v-if="itemInfo.discount > 0" class="card-title text-danger">Discount {{ itemInfo.discount }}%</h4>
      <h6 class="card-subtitle mb-2 text-muted pt-2">Pieces available: {{
          itemInfo.availablePieces - countInCart()
        }}</h6>
      <a v-if="canAddItemIntoCart()" class="btn btn-primary" @click="handleClick">Add to cart</a>
      <a v-else class="btn btn-primary disabled">Add to cart</a>
      <button v-if="isInWishlist" class="btn btn-light" type="button" @click="removeFromWishlist">Remove 💖</button>
      <button v-else class="btn btn-light" type="button" @click="addToWishlist">Add to 🤍</button>
    </div>
  </div>
</template>

<style scoped>

</style>