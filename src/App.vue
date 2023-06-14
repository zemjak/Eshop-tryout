<script>
import PageNavbar from '@/components/PageNavbar.vue';
import ShoppingItem from "@/components/ShoppingItem.vue";

export default {
  data() {
    return {
      isLoading: true,
      productList: [],
      cart: []
    };
  },
  components: {
    ShoppingItem,
    PageNavbar
  },
  methods: {
    fetchData() {
      fetch('./json/productList.json')
          .then(response => response.json())
          .then(jsonData => {
            this.productList = jsonData
            this.isLoading = false
          })
          .catch(error => {
            this.isLoading = false
            console.error(error);
          });
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>


<template>
  <PageNavbar :cart="cart"/>

  <div v-if="isLoading" class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  <div v-else class="container">
    <div class="row" v-for="row in Math.ceil(productList.length / 3)" :key="row">
      <template v-for="column in 3" :key="column">
        <div class="col d-flex justify-content-center" v-if="(row - 1) * 3 + (column - 1) < productList.length">
          <ShoppingItem :item-info="productList[(row - 1) * 3 + (column - 1)]"/>
        </div>
      </template>
    </div>
  </div>
</template>
