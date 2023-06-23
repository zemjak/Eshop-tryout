<script>
export default {
  props: {
    itemInfo: {
      type: Object,
      required: true,
    },
    amount: {
      type: Number,
      required: true
    }
  },

  setup(props) {
    return {
      itemInfo: props.itemInfo,
      amount: props.amount
    }
  }
}
</script>

<template>
  <div class="card">
    <h5 class="card-header">{{ itemInfo.name }}</h5>
    <div class="card-body">
      <h5 class="card-title">Price: {{ itemInfo.price }}</h5>
      <div class="form-outline">
        <input type="number" id="typeNumber" class="form-control" :value="amount"/>
        <label class="form-label" for="typeNumber">Amount in cart</label>
      </div>
      <a class="btn btn-primary">Remove from cart</a>
    </div>
  </div>
</template>
