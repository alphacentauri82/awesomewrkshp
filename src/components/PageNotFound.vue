<template>
  <div class="jumbotron">
    <h1 class="display-4">Woops!</h1>
    <p class="lead">The resource you are trying to reach doesn't exist or you don't have enough permissions.</p>
    <hr class="my-4">
    <p>Try again after login in!.</p>
    <router-link class="btn btn-danger btn-lg" to="/" exact activeClass="active">Home</router-link>
  </div>
</template>
<script>

export default {
  name: 'PageNotFound'
}

</script>
