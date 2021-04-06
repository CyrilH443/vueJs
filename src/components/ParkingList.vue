<!-- On utilise ici le plugin de localisation comme vue en cours qui nous permet de récuperer notre localisation -->
<template>
  <div class="column is-four-fifths-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-full-fullhd">
    <h1 class="title is-1">Liste des parkigs Nantais</h1><br>
    <input class="input is-medium"  type="text"  v-on:keyup="searchParking" v-model="q" placeholder="Recherche Parking"><br><br><br>
    <div class="columns is-multiline">
        <Parking
          v-for="parking in parkings"
          :key="parking.fields.idobj"
          class="column is-half-tablet is-one-third-desktop is-one-quarter-widescreen"
          :parking="parking"
          :userLocation="currentUserLocation"
        />
    </div>
  </div>
</template>


<script>
import axios from "axios";
import Parking from "./Parking.vue";
import { Plugins} from "@capacitor/core";
const { Geolocation } = Plugins;

export default {
  name: "ParkingDetails",
  components: {
    Parking,
  },
  data() {
    return {
      parkings: new Array(),
      parkingSearcher: new Array(),
      q : '',
      currentUserLocation: { latitude: 0, longitude: 0 },
    };
  },
  methods:{
    searchParking:function(){
      if(this.q != ""){
        this.parkings = this.parkingSearcher.filter(parking=>{
                          return parking.fields.nom_complet.toLowerCase().includes(this.q.toLowerCase());
                        }
                  );
      }else{
        axios
        .get(
          "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_parkings-publics-nantes&q=&facet=libcategorie&facet=libtype&facet=acces_pmr&facet=service_velo&facet=stationnement_velo&facet=stationnement_velo_securise&facet=moyen_paiement"
        )
        .then((response) => {
          this.parkings         = response.data.records;
        })
        .catch((error) => {
          console.log(error);
        });
      }
    },
  },
  
  mounted() {
    axios
      .get(
        "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_parkings-publics-nantes&q=&facet=libcategorie&facet=libtype&facet=acces_pmr&facet=service_velo&facet=stationnement_velo&facet=stationnement_velo_securise&facet=moyen_paiement"
      )
      .then((response) => {
        this.parkings         = response.data.records;
        this.parkingSearcher  = response.data.records;
      })
      .catch((error) => {
        console.log(error);
      });

      Geolocation.getCurrentPosition().then((location) => {
      this.currentUserLocation = location.coords;
    });

  },
};
</script>
