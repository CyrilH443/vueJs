<template>
  <div class="column is-four-fifths-mobile is-two-thirds-tablet is-full-desktop is-full-widescreen is-full-fullhd">
    <div class="columns is-multiline">
        <ParkingDetail
          v-for="parking in parkings"
          :key="parking.idobj"
          class="column is-four-fifths-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-full-fullhd"
          :parking="parking"
        />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ParkingDetail from "./ParkingDetail.vue";

export default {
  name: "ParkingDetails",
  props: {
    id: String,
  },

  components: {
    ParkingDetail,
  },

  data() {
    return {
      parkings: new Array(),
    };
  },

  methods:{
  },
  
  mounted() {
    axios
      .get(
        "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_parkings-publics-nantes&facet=libcategorie&facet=libtype&facet=acces_pmr&facet=service_velo&facet=stationnement_velo&facet=stationnement_velo_securise&facet=moyen_paiement&q=idobj%3D"+ this.id
      )
      .then((response) => {
        this.parkings         = response.data.records;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
