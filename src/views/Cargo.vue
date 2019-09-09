<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Cargos</h1>

    <v-container class="my-5">
      <v-snackbar v-model="snackbar" top :timeout="5000" color="success">
        <span>Has agregado un nuevo cargo</span>
        <v-btn dark text @click="snackbar = false">Cerrar</v-btn>
      </v-snackbar>

      <v-layout row justify-start class="mb-3">
        <v-tooltip top>
        <template v-slot:activator="{ on }">
            <v-btn small color="grey" @click="sortBy('cargo')" v-on="on">
                <v-icon small left>fas fa-folder-open</v-icon>
                <span class="caption text-lowercase">Por Cargo</span>
            </v-btn>
        </template>    
          <span>Ordenar por Cargo</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">  
            <v-btn small color="grey" @click="sortBy('area')"  v-on="on">
                <v-icon small left>fas fa-user-friends</v-icon>
                <span class="caption text-lowercase">Por Área</span>
            </v-btn>
          </template>    
          <span>Ordenar por Área</span>
        </v-tooltip>
        <v-spacer></v-spacer>
        <v-tooltip top>
          <template v-slot:activator="{ on }">  
              <!-- <v-btn color="success" @click.stop="dialog = true">Nuevo Cargo</v-btn>    -->
              <cargoc @cargoAdded="snackbar = true"/>
          </template>    
        </v-tooltip>

      </v-layout>
      
      <v-card flat v-for="cargo in cargos" :key="cargo.cargo">
        <v-layout row wrap :class="`pa-3 cargo ${cargo.area}`">
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Cargo</div>
            <div>{{ cargo.cargo }}</div>
          </v-flex>
          <v-flex xs12 md6>
            <div class="caption grey--text">Descripcion</div>
            <div>{{ cargo.descripcion }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Seniority</div>
            <div>{{ cargo.seniority }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Area</div>
            <div>{{ cargo.area }}</div>
          </v-flex>

          <!-- <v-flex xs2 sm4 md2>
            <div class="right">
              <v-chip small :class="`${project.status} white--text my-2 caption`">{{ project.status }}</v-chip>
            </div>
          </v-flex> -->

        </v-layout>
        <v-divider></v-divider>
      </v-card>

    </v-container>
   
  </div>
</template>

<script>
import cargoc from '@/components/Cargo-c.vue'
import { db } from "@/firebase";
export default {
   components: { cargoc },
  data() {
    return {
      cargos: [],
      /*   { cargo: "Front End", descripcion: "Front End Desd", seniority: "Semi Senior", area: "Desarrollo"},
        { cargo: "Back End", descripcion: "Back End Desd", seniority: "Senior", area: "Desarrollo"},
        { cargo: "Ejecutivo Comercial", descripcion: "Ejecutivo Comercial", seniority: "Semi Senior", area: "Comercial"},
        { cargo: "Recruiter", descripcion: "Recruiter Desd", seniority: "Senior", area: "Admin"},
      */
      
      snackbar : false
    }
  },
  methods: {
    sortBy(prop) {
      this.cargos.sort((a,b) => a[prop] < b[prop] ? -1 : 1)
    }
  },
    created () {
    db.collection("cargo").onSnapshot(res => {
      const changes = res.docChanges();

      changes.forEach(change => {
        if (change.type === "added") {
          this.cargos.push({
            ...change.doc.data(),
            id: change.doc.id
          })
        }
      })
    })
  }  
}
</script>

<style>
.v-chip.complete{
  background: #3cd1c2;
}
.v-chip.ongoing{
  background: #ffaa2c;
}
.v-chip.overdue{
  background: #f83e70;
}

.cargo.Desarrollo{
  border-left: 4px solid #3cd1c2;
}
.cargo.Comercial{
  border-left: 4px solid #ffaa2c;
}
.cargo.Admin{
  border-left: 4px solid #f83e70;
}


</style>