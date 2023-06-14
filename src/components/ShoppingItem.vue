<script>
export default {
  props: {
    itemInfo: {
      type: Object,
      required: true,
    }
  },
};
</script>

<template>
  <div class="card" style="width: 18rem;">
    <img :src="itemInfo.picture" class="card-img-top" :alt="itemInfo.picture" >
    <div class="card-body">
      <h4 class="card-title">{{ itemInfo.name }}</h4>
<!--      <p class="card-text">{{ itemInfo.about }}</p>-->
      <h5 class="card-title">{{ itemInfo.price }}€</h5>
      <div class="progress">
        <div class="progress-bar" role="progressbar" :style="{ width: ((itemInfo.rating - 1) / 5) * 100 + '%' }"></div>
        <span>Rating: {{ itemInfo.rating }}</span>
      </div>
      <h4 v-if="itemInfo.discount > 0" class="card-title text-danger">Discount {{ itemInfo.discount }}%</h4>
      <h6 class="card-subtitle mb-2 text-muted">Pieces available: {{ itemInfo.availablePieces }}</h6>
      <a v-if="itemInfo.availablePieces > 0" href="#" class="btn btn-primary">Add to cart</a>
      <a v-else href="#" class="btn btn-primary disabled">Add to cart</a>
    </div>
  </div>
</template>

<style scoped>

</style>