<template>
    <nav>
    <v-app-bar app>
    
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>  
      <v-toolbar-title class="headline text-uppercase">
        <router-link :to="{name:'home'}"> 
            <span>Gast-E-itor</span>
        </router-link>
        <span class="font-weight-light"></span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="cerrarSesion">
        <span class="mr-2">Cerrar Sesión</span>
        <v-icon>fas fa-address-book</v-icon>
      </v-btn>
    </v-app-bar>
    

    <v-navigation-drawer absolute
      dark
      src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
      v-model="drawer" app>
        <v-layout column align-center mt-5>
            <v-flex>
                <v-avatar>
                    <img :src=usuario.foto alt="avatar">
                </v-avatar> 
            </v-flex>
            <p class="mt-3 white--text">{{usuario.nombre}}</p>
        </v-layout>

        <v-divider></v-divider>
        <v-list>
            <v-list-item v-for="item in items" :key="item.title" :to="item.to" > 
                <v-list-item-action>
                    <v-icon>{{item.icon}}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                      <v-list-item-title>{{item.title}}</v-list-item-title>
                </v-list-item-content>    
            </v-list-item>
        </v-list>


    </v-navigation-drawer>

    </nav>
</template>

<script>
import {mapActions, mapState} from "vuex"

export default {
  data(){
     return {
         drawer: true,
         items: [
          { title: 'Inicio', icon: 'fas fa-address-card', to: {name:'home'} },
          { title: 'Ingreso', icon: 'fa fa-superpowers', to: {name:'ingreso'} },
          { title: 'Admin', icon: 'fas fa-archive', to: {name:'admin'} },
        ],
     }
  },
  methods: {
    ...mapActions(['cerrarSesion'])
  },
  computed: {
      ...mapState(['usuario'])
  }

};

</script>
