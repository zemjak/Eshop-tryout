<script>

import {useStore} from "vuex";
import {computed} from "vue";
import ShoppingItem from "@/components/ShoppingItem.vue";

export default {
  components: {ShoppingItem},
  setup() {
    const store = useStore()

    const arrayFromSet = computed(() => store.getters.filterItemsIntoWishList)

    return {
      arrayFromSet
    }
  }
}
</script>

<template>
  <div v-if="arrayFromSet.length === 0" class="text-center">
    <p>Your wish list is empty...</p>
    <p>Look for some interesting products at our home page!</p>
  </div>
  <div v-else class="container">
    <div v-for="row in Math.ceil(arrayFromSet.length / 3)" :key="row" class="row pb-4">
      <template v-for="column in 3" :key="column">
        <div v-if="(row - 1) * 3 + (column - 1) < arrayFromSet.length" class="col d-flex justify-content-center">
          <ShoppingItem :key="arrayFromSet[(row - 1) * 3 + (column - 1)].guid"
                        :item-info="arrayFromSet[(row - 1) * 3 + (column - 1)]"/>
        </div>
      </template>
    </div>
  </div>
</template>
