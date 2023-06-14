<script>
export default {
  props: {
    cart: {
      type: Object,
      required: true,
    }
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light navbar-dark bg-dark shadow p-3 mb-5 rounded-bottom">
    <a class="navbar-brand" href="#">Simple e-shop</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Features</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pricing</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Dropdown link
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
          </div>
        </li>
        <li>
          <button type="button" class="btn btn-primary">
            Cart <span class="badge badge-light">{{ cart.length }}</span>
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>

</style>