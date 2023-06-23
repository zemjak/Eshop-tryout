<script>

import CartItem from "@/components/CartItem.vue";

export default {
  components: {CartItem},

  setup() {
    const itemInfo = {
      "_id": "6489f4a1d0f3a4357aa56e69",
      "index": 99,
      "guid": "cabf1265-0169-4d06-8059-0335e1bfe390",
      "price": 171.28,
      "discount": 7,
      "picture": "http://placehold.it/512x512",
      "availablePieces": 8,
      "rating": 3.2,
      "name": "Product name 99",
      "about": "Incididunt nulla incididunt exercitation irure magna excepteur cupidatat ut ea consectetur et excepteur culpa. Aliqua sint fugiat commodo proident culpa laboris aliquip. Qui laborum nulla incididunt sit laboris amet qui. Eu aliqua excepteur minim et nisi exercitation eu mollit anim. Sunt id sit id consectetur qui esse ullamco sint irure deserunt quis sint est ad. Lorem enim pariatur duis consequat nulla cillum duis cillum magna exercitation.\r\n",
      "tags": [
        "nulla",
        "ad"
      ]
    }

    return {
      itemInfo
    }
  }
}
</script>

<template>
  <CartItem :amount="4" :item-info="itemInfo"/>

  <div class="text-center m-8">
    <h3>Total price: 23456</h3>
  </div>
  <div class="text-center m-8">
    <button class="btn btn-primary">Place order</button>
  </div>
</template>
