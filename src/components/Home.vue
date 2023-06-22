<script>
import PageNavbar from "@/components/PageNavbar.vue";
import ShoppingItem from "@/components/ShoppingItem.vue";
import {onMounted, ref} from "vue";

export default {
  components: {
    ShoppingItem,
    PageNavbar
  },

  setup(props) {
    const apiUrl = "https://9gn9bc16qc.execute-api.eu-central-1.amazonaws.com/beta"

    const isLoading = ref(true)
    const productList = ref([])
    const orderBy = ref("Name")
    const cart = ref(new Map())
    const wishlist = ref(new Set())

    const setOrderBy = (orderType) => {
      orderBy.value = orderType

      if (orderBy.value === "Price") {
        productList.value = productList.value.sort((a, b) => {
          return a.price - b.price
        })
      } else if (orderBy.value === "Sale") {
        productList.value = productList.value.sort((a, b) => {
          return b.discount - a.discount
        })
      } else {
        productList.value = productList.value.sort((a, b) => {
          return a.name.localeCompare(b.name)
        })
      }
    }

    onMounted(() => {
      fetch(apiUrl + '/all') //{"body": JSON.stringify({"orderType": orderBy})})
          .then(response => response.json())
          .then(jsonData => {
            productList.value = jsonData
            isLoading.value = false
          })
          .catch(error => {
            isLoading.value = false
            console.error(error);
          });
    })

    return {
      isLoading,
      productList,
      cart,
      wishlist,
      orderBy,
      setOrderBy
    };
  }
};
</script>

<template>
  <PageNavbar :cart="cart" @updateOrder="setOrderBy"/>

  <p>{{ $route.meta.sprava }}</p>

  <div v-if="isLoading" class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  <div v-else class="container">
    <div class="row pb-4" v-for="row in Math.ceil(productList.length / 3)" :key="row">
      <template v-for="column in 3" :key="column">
        <div class="col d-flex justify-content-center" v-if="(row - 1) * 3 + (column - 1) < productList.length">
          <ShoppingItem :item-info="productList[(row - 1) * 3 + (column - 1)]"
                        :cart="cart" :wishlist="wishlist"
                        :key="productList[(row - 1) * 3 + (column - 1)].guid"/>
        </div>
      </template>
    </div>
  </div>
</template>
