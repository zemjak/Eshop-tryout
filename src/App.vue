<script>

import PageNavbar from "@/components/PageNavbar.vue";

export default {
  components: {
    PageNavbar
  }
}

</script>


<template>
  <div>
    <PageNavbar/>

    <router-view/>
  </div>
</template>
