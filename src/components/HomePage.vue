<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title is-1">Quaerere</h1>
        <br><br>
        <h2 class="subtitle">Trouves les parkings les moins remplis de ta région !</h2>
        <br><br>
        <img v-bind:src="image"/>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      image : "./assets/img/Parking_Menu.jpg",
    };
  },
};
</script>