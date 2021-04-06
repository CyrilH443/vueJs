<!-- Fen permettant "d'enregistrer" la location de son parking privé, place de parking, garage .....
    L'objetif de la fen est d'utiliser des plugins capacitor. Ici on utilise les plugins Local Notification,Toast et Camera. 
    Il n'y a aucun enregistrement a la validation car ce n'était pas l'objetif de ce projet. -->

<template>
    <div class="column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-full-fullhd">
        
        <h1 class="title is-1">Mon petit parking</h1><br>
        
        <div class="field">
            <label class="label">Nom de la location</label>
            <div class="control">
                <input class="input" type="text" placeholder="Pouvoir de l'amitié" v-model="nom">
            </div>
        </div>

        <div class="field">
            <label class="label">User</label>
            <div class="control">
                <input class="input" type="text" placeholder="User" v-model="user">
            </div>
        </div>

        <div class="field">
            <label class="label">Email</label>
            <div class="control">
                <input class="input" type="text" placeholder="Exemple@mail.com" v-model="mail">
            </div>
        </div>

        <div class="field">
            <label class="label">Type</label>
            <div class="control">
                <div class="select">
                <select>
                    <option>Garage</option>
                    <option>Place exterieur</option>
                    <option>Stationnement privé</option>
                </select>
                </div>
            </div>
        </div>

        <label class="label">Prix</label>   
        <div class="field has-addons">
            <p class="control">
                <span class="select">
                <select>
                    <option>€</option>
                    <option>$</option>
                    <option>£</option>
                </select>
                </span>
            </p>
            <p class="control is-expanded">
                <input class="input" type="text" placeholder="0,0" v-model="prix">
            </p>
        </div>

        <div class="field">
            <label class="label">Message</label>
            <div class="control">
                <textarea class="textarea" placeholder="Commentaire" v-model="com"></textarea>
            </div>
        </div>

        <div class="field">
            <div class="control">
                <label class="checkbox">
                <input type="checkbox" v-model="val">
                    I agree to <a href="https://en.wikipedia.org/wiki/Human" target="_blank">Je suis humain</a>
                </label>
            </div>
        </div>

        <div class="field">
            <img  v-bind:src="image"> <br>
            <div class="file has-name is-middle">
                <label class="file-label">
                <input class="file-input" v-on:click="TakePhoto()" name="resume">
                <span class="file-cta">
                <span class="file-icon">
                    <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                    Choisir une photo
                </span>
                </span>
                <span class="file-name">
                    {{image}}
                </span>
            </label>
            </div>
        </div>

        <br> <br>
        
        <div class="field is-grouped"> 
            <div class="control">
                <button class="button is-link" v-on:click="NotifValidation()">Enregistrer</button>
            </div>
        </div>
    
    </div>
</template>

<script>
import { Plugins,CameraResultType} from "@capacitor/core";
const { LocalNotifications } = Plugins;
const { Toast } = Plugins;
const { Camera } = Plugins;

export default {
  name: "Louer",
  data() {
    return {
        nom:"",
        user:"",
        mail:"",
        prix:"",
        com:"",
        val:false,
        image : "https://bulma.io/images/placeholders/128x128.png",
    };
  },
  methods:{
      // Méthode permettant de créer une notification lors de l'appuis sur le bouton validation
      async NotifValidation(){
            if(this.nom != "" && this.user != "" && this.mail != "" && this.prix != "" && this.val == true){
                await LocalNotifications.schedule({
                    // Correspond au corps de la notification
                    notifications:[
                        {
                        title : 'Enregistrement',
                        body : 'Vous avez enregistré : ' + this.nom,
                        id: 1,
                        iconColor:'#8A8A8C'
                        }
                    ]
                    })
                this.nom   = ""
                this.user = ""
                this.mail = ""
                this.prix = ""
                this.com  = ""
                this.val  = false
                this.image = "https://bulma.io/images/placeholders/128x128.png"
                // Nous aurions preferer afficher une alrte sur web et le toast sur smartphone
                // mais l'alerte s'affiche aussi sur smartphone.
                Toast.show({
                text: 'Parking enregistré' });
                 alert("Parking enregistré")
            }else{
                Toast.show({
                text: 'Il manque des valeurs' });
                alert("Il manque des valeurs")
            }
        },

        // Méthode permettant de récuperer une photo.
        async TakePhoto(){
            const image =  await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            resultType: CameraResultType.Uri
                });
                var imageUrl = image.webPath;
                this.image = imageUrl;
                },
  }, 
};
</script>
