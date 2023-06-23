<script>

import {useStore} from "vuex";
import {computed, onMounted} from "vue";
import ShoppingItem from "@/components/ShoppingItem.vue";

export default {
  components: {ShoppingItem},
  setup() {
    const store = useStore()

    const wishlist = computed(() => store.state.wishlist)
    const arrayFromSet = computed(() => Array.from(wishlist.value))

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
    <div class="row pb-4" v-for="row in Math.ceil(arrayFromSet.length / 3)" :key="row">
      <template v-for="column in 3" :key="column">
        <div class="col d-flex justify-content-center" v-if="(row - 1) * 3 + (column - 1) < arrayFromSet.length">
          <ShoppingItem :item-info="arrayFromSet[(row - 1) * 3 + (column - 1)]"
                        :key="arrayFromSet[(row - 1) * 3 + (column - 1)].guid"/>
        </div>
      </template>
    </div>
  </div>
</template>
