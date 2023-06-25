<script>
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  props: {
    itemInfo: {
      required: true,
    }
  },

  setup(props) {
    const store = useStore()

    const getAmount = computed(() => store.state.cart.get(props.itemInfo.guid))
    const removeFromCart = () => {
      store.state.cart.delete(props.itemInfo.guid)
    }
    const handleAmountChange = (event) => {
      const inputValue = event.target.value

      if (inputValue > props.itemInfo.availablePieces) {
        event.target.value = props.itemInfo.availablePieces
        // tell user that there are no more available pieces
      } else if (inputValue < 1) {
        event.target.value = 1
        // tell  user that u cant have less than 1 item in cart.. if u want to remove it click on button..
      }
      store.state.cart.set(props.itemInfo.guid, event.target.value)
    }

    return {
      itemInfo: props.itemInfo,
      removeFromCart,
      handleAmountChange,
      getAmount
    }
  }
}
</script>

<template>
  <div class="card">
    <h5 class="card-header">{{ itemInfo.name }}</h5>
    <div class="card-body">
      <h5 class="card-title">Unit price: {{ itemInfo.price }}</h5>
      <div class="form-outline">
        <input type="number" id="typeNumber" class="form-control" :value="getAmount" @input="handleAmountChange"/>
        <label class="form-label" for="typeNumber">Amount in cart</label>
      </div>
      <a class="btn btn-primary" @click="removeFromCart">Remove from cart</a>
    </div>
  </div>
</template>
