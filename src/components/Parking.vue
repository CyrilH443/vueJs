<!-- Composant Parking. On y trouve le router link avec parametre.-->
<template>
<div class="composter">
    <div class="card" style="background-color:#1A1FCF ">       
      <br>
        <div class="media-content">
        <p class="title is-4" style="color:#FFFFFF">{{parking.fields.nom_complet}}</p><br>
        <p class="subtitle is-6" style="color:#FFFFFF">{{ parking.fields.adresse }},  {{ parking.fields.code_postal }} {{ parking.fields.commune }}</p>
      </div>
      <br><br>
      <div>
        <h1  style="color:#FFFFFF" v-if="userLocation && userLocation.latitude != 0">
            Vous êtes à 
            {{
              calcDistance(
               userLocation.latitude,
                userLocation.longitude,
                this.parking.geometry.coordinates[1],
                this.parking.geometry.coordinates[0]
              )
            }}km
          </h1>
        </div>
        <router-link :to="{ name: 'ParkingDetails', params: { id: parking.fields.idobj  } }">
          <br>
          <br>
          <button class="button is-info is-light">
              Informations
          </button>
        </router-link>
        <br><br>
    </div>
    </div>
</template>

<script>


export default {
  name: "Parking",
  props: {
    parking: {},
    userLocation: {},
  },
  methods: {
    // Les méthodes suivantes proviennent de ce qui a été fait en cours. 
    // Elles permettent de calculer la distance entre notre position et la localisation d'un parking.
    calcDistance(lat1, lon1, lat2, lon2) {
      var R = 6371; // km
      var dLat = this.toRad(lat2 - lat1);
      var dLon = this.toRad(lon2 - lon1);
      lat1 = this.toRad(lat1);
      lat2 = this.toRad(lat2);

      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
          Math.sin(dLon / 2) *
          Math.cos(lat1) *
          Math.cos(lat2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return Math.round(d);
    },
    // Converts numeric degrees to radians
    toRad(Value) {
      return (Value * Math.PI) / 180;
    },
  },
};
</script>