<template>
<div class="card">
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img src="../../public/assets/img/Parking.png" alt="Placeholder image">
        </figure>
        <!-- Si accès PMR au parking, alors on affiche une image pour le préciser. -->
        <div v-if="parking.fields.acces_pmr == 'OUI'">
          <br>
          <figure class="image is-48x48">
            <img src="../../public/assets/img/PMR.png" alt="Placeholder image">
          </figure>
        </div>
      </div>
      <div class="media-content">
        <p class="title is-2">{{parking.fields.nom_complet}}</p>
        <p class="subtitle is-4">{{ parking.fields.adresse }},  {{ parking.fields.code_postal }} {{ parking.fields.commune }}</p>
      </div>
    </div>

    <div class="content">
      {{ parking.fields.presentation }}
    </div>
    <div class="content">
      <p class="title is-6">Informations complémentaires</p>
      <!-- Les véhicules possible au stationnement et leur capacité -->
      <span class="tag is-primary is-light" v-if="parking.fields.capacite_voiture > 0">Voiture({{parking.fields.capacite_voiture}})</span>
      <span class="tag is-danger  is-light"  v-if="parking.fields.capacite_moto > 0">Moto({{parking.fields.capacite_moto}})</span>
      <span class="tag is-link is-light"    v-if="parking.fields.capacite_vehicule_electrique > 0">Voiture éléctrique({{parking.fields.capacite_vehicule_electrique}})</span>
      <span class="tag is-success is-light" v-if="parking.fields.capacite_velo > 0">Vélo({{parking.fields.capacite_moto}})</span>
      <div v-if="parking.fields.acces_transports_communs != ''">
        <table class="table">
          <thead>
            <tr>
              <th>Accès transports en commun</th>
            </tr>
          </thead>
          <tbody>
            <tr>{{ parking.fields.acces_transports_communs }}</tr>
          </tbody>
        </table>
      </div>
      <div v-if="parking.fields.moyen_paiement != ''">
        <table class="table">
          <thead>
            <tr>
              <th>Moyens de paiement</th>
            </tr>
          </thead>
          <tbody>
            <tr>{{ parking.fields.moyen_paiement }}</tr>
          </tbody>
        </table>
      </div>
      <br><br>

      <a :href="parking.fields.site_web" target="out">
          <button class="button is-primary">
            Consulter site web
          </button>
      </a>
      <br><br>
      <a :href="googleMapsLink" target="out">
          <button class="button is-info">
            Ouvrir dans Google Maps
          </button>
      </a>
    </div>
  </div>
</div>

</template>

<script>
export default {
name: "Parking",
  props: {
    parking: {},
  },
    computed: {
    googleMapsLink() {
      return (
        "https://maps.google.com/?q=" +
        this.parking.geometry.coordinates[1] +
        "," +
        this.parking.geometry.coordinates[0]
      );
    },
  },
};
</script>

<style scoped>
  .container {
  width: 80%;
  padding: 20px;
}
.card {
  margin: auto;
  width: 80%;
}

</style>