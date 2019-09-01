<template>
  <v-layout justify-center="" mt4>
    <v-flex xs12 sm8 md6 xL4>
        <v-card>

          <v-card-text class="display-1 text-uppercase white--text 
          text-xs-center" :class="registro ? 'success' : 'primary'">
            <span v-if="!registro">Ingreso</span>
            <span v-if="registro">Registro</span>

          </v-card-text>
        
          <v-card-text>
            <v-btn block color="error" @click="google">
              <v-icon Left dark>fab fa-google</v-icon>
              Google
            </v-btn>
            <v-btn block color="info"  @click="facebook">
              <v-icon Left dark>fab fa-facebook-f</v-icon>
              Facebook
            </v-btn>
          </v-card-text>

          <v-card-text>
            <v-btn block @click="registro=true" v-if="!registro">¿No tienes cuenta? Registrate aquí</v-btn>
            <v-btn block @click="registro=false" v-if="registro">¿Ya tienes cuenta? Registrate aquí</v-btn>
          </v-card-text>
        </v-card>
    </v-flex>
  </v-layout>
  
</template>

<script>

import { firebase, auth, db } from "@/firebase";
import { mapMutations, mapState } from "vuex";
import router from "@/router"

export default {
  data() {
    return {
      registro: false
    }
  },
    methods: {
      ...mapMutations(['nuevoUser']),
      ...mapState(['setUser']),
       async google(){
        const provider = new firebase.auth.GoogleAuthProvider();
        console.log('google');
        this.ingreso(provider);
       },
              
      async facebook(){
        const provider = new firebase.auth.FacebookAuthProvider();
        console.log('facebook');
        this.ingreso(provider);
       },
    async ingreso(provider){
        
        firebase.auth().languageCode = 'es';

        try {
          const result = await firebase.auth().signInWithPopup(provider)
          const user = result.user;
          console.log(user)
          // Construir usuario

          this.setUser(user)
          
          router.push({ name: 'home' })

        } catch (error) {
          console.log(error)
        }

      },

    }
  
};
</script>
