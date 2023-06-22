<script>
import {ref} from "vue";

export default {
  props: {
    itemInfo: {
      type: Object,
      required: true,
    },
    cart: {
      type: Map,
      required: true
    },
    wishlist: {
      type: Set,
      required: true
    }
  },

  setup(props) {
    const countInCart = () => {
      return props.cart.get(props.itemInfo) === undefined ? 0 : props.cart.get(props.itemInfo)
    }
    const handleClick = () => {
      if (props.cart.has(props.itemInfo)) {
        if (props.cart.get(props.itemInfo) < props.itemInfo.availablePieces) {
          props.cart.set(props.itemInfo, props.cart.get(props.itemInfo) + 1)
        }
      } else {
        if (props.itemInfo.availablePieces > 0) {
          props.cart.set(props.itemInfo, 1)
        }
      }
    }
    const canAddItemIntoCart = () => {
      return (props.itemInfo.availablePieces > 0) && (countInCart() < props.itemInfo.availablePieces)
    }
    const isItemInWishlist = () => {
      return props.wishlist.has(props.itemInfo)
    }
    const addToWishlist = () => {
      props.wishlist.add(props.itemInfo)
    }
    const removeFromWishlist = () => {
      props.wishlist.delete(props.itemInfo)
    }

    return {
      itemInfo: props.itemInfo,
      handleClick,
      canAddItemIntoCart,
      countInCart,
      isItemInWishlist,
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

      <button v-if="isItemInWishlist()" @click="removeFromWishlist" type="button" class="btn btn-light">Remove 💖</button>
      <button v-else type="button" @click="addToWishlist" class="btn btn-light">Add to 🤍</button>
    </div>
  </div>
</template>

<style scoped>

</style>