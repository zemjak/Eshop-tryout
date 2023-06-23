<script>
import PageNavbar from "@/components/PageNavbar.vue";
import ShoppingItem from "@/components/ShoppingItem.vue";
import {computed, onMounted} from "vue";
import {useStore} from "vuex";

export default {
  components: {
    ShoppingItem,
    PageNavbar
  },

  setup() {
    const store = useStore()

    const isLoading = computed(() => store.state.isLoading)
    const productList = computed(() => store.state.productList)
    const orderBy = computed(() => store.state.orderBy)
    const cart = computed(() => store.state.cart)
    const wishlist = computed(() => store.state.wishlist)
    const setOrderBy = (orderType) => {
      store.commit("setOrderBy", orderType)
    }

    onMounted(() => {
      store.dispatch("fetchData")
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
                        :key="productList[(row - 1) * 3 + (column - 1)].guid"/>
        </div>
      </template>
    </div>
  </div>
</template>
