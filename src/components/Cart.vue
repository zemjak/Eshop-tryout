<script>

import CartItem from "@/components/CartItem.vue";
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  components: {CartItem},

  setup() {
    const store = useStore()

    const arrayFromMap = computed(() => store.getters.filterItemsIntoCartList)
    const totalPrice = computed(() => {
      let sum = 0
      store.state.cart.forEach((amount, itemGuid) => {
        sum += store.state.productList.find(item => item.guid === itemGuid).price * amount
      })
      return sum.toFixed(2)
    })

    const isCartEmpty = computed(() => store.state.cart.size === 0)

    const placeOrder = () => {
      store.commit("deleteCart")
      alert("Your order has been sent successfully!")
      store.commit("saveStoreIntoLocalStorage")
    }

    return {
      arrayFromMap,
      totalPrice,
      isCartEmpty,
      placeOrder
    }
  }
}
</script>

<template>
  <div v-if="isCartEmpty" class="text-center">
    <p>Your cart is empty...</p>
    <p>Look for some interesting products at our home page!</p>
  </div>
  <div v-else>
    <template v-for="shoppingItem in arrayFromMap">
      <CartItem :item-info="shoppingItem"/>
    </template>

    <div class="text-center m-8">
      <h3>Total price: {{ totalPrice }}</h3>
    </div>
    <div class="text-center m-8">
      <button class="btn btn-primary" @click="placeOrder">Place order</button>
    </div>
  </div>
</template>
