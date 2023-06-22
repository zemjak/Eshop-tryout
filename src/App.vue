<script>

import {defineComponent, ref} from "vue";
import PageNavbar from "@/components/PageNavbar.vue";

export default {
  components: {PageNavbar},

  setup(props) {
    const cart = ref(new Map())

    return {
      cart
    }
  }
}
</script>


<template>
  <div>
    <keep-alive>
      <PageNavbar :cart="cart" @updateOrder="setOrderBy"/>
    </keep-alive>

    <router-view/>
  </div>
</template>
