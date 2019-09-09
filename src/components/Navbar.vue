<template>
    <nav>
    <v-app-bar app>
    <!-- <v-toolbar app> -->

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon> 
      <!-- <v-toolbar-side-icon class="grey--text" @click="drawer = !drawer"></v-toolbar-side-icon>    -->

      <!-- <v-toolbar-title class="text-uppercase grey--text" > -->
      <v-toolbar-title class="headline text-uppercase">
        
        <router-link :to="{name:'home'}"> 
            <span>Spencer</span>
        </router-link>
        <span class="font-weight-light"></span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn  v-bind="attrs" v-on="on"> 
            <v-icon left>fas fa-chevron-down</v-icon>
            <span>Menú</span>
          </v-btn>
        </template>
      <v-list>
            <v-list-item-group v-model="cnt" >
             <v-list-item v-for="item in items" :key="item.title" router :to="item.to" > 
                <v-list-item-action >
                    <v-icon>{{item.icon}}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                      <v-list-item-title>{{item.title}}</v-list-item-title>
                </v-list-item-content>    
              </v-list-item>
            </v-list-item-group>
        </v-list>
      </v-menu>


      <v-btn @click="cerrarSesion">
        <span class="mr-2">Cerrar Sesión</span>
        <v-icon>fas fa-address-book</v-icon>
      </v-btn>
    <!-- </v-toolbar> -->
    </v-app-bar>
    
<!-- src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg" -->
    <v-navigation-drawer app 
      v-model="drawer" 
      dark
      color="indigo"
      absolute 
      >
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
            <v-list-item-group v-model="cnt">
             <v-list-item v-for="item in items" :key="item.title" router :to="item.to" > 
                <v-list-item-action >
                    <v-icon>{{item.icon}}</v-icon>
                </v-list-item-action>
                <v-list-item-content class="white--text">
                      <v-list-item-title>{{item.title}}</v-list-item-title>
                </v-list-item-content>    
              </v-list-item>
            </v-list-item-group>
        </v-list>


    </v-navigation-drawer>

    </nav>
</template>

<script>
import {mapActions, mapState} from "vuex"
import cargoc from './Cargo-c.vue'

export default {
  components: { cargoc },
  data(){
     return {
         drawer: true,
         snackbar: true,
         cnt: 1,
         items: [
          //{ title: 'Inicio', icon: 'fas fa-address-card', to: {name:'home'} },
          { title: 'Ingreso', icon: 'fas fa-user-shield', to: {name:'ingreso'} },
          { title: 'Usuario', icon: 'fas fa-user-tie', to: {name:'admin'} },
          { title: 'Chat', icon: 'fas fa-comments', to: {name:'chat'} },
          { title: 'Cargos', icon: 'fas fa-archive', to: {name:'cargo-'} },
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
