<script setup>

import PageNavbar from "@/components/PageNavbar.vue";
</script>

<template>
  <p>Wishlist</p>
  <PageNavbar :cart="cart" @updateOrder="setOrderBy"/>
</template>

<style scoped>

</style>