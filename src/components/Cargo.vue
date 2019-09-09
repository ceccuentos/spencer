<template>
   <nav>
   <v-btn color="success" @click.stop="dialog = true">Nuevo Cargo</v-btn>   
  <v-dialog max-width="600px" v-model="dialog" >

      <v-card class="mx-auto" :loading="loading"> 
        <v-card-title>Nuevo Cargo</v-card-title>
        <v-card-text>
          <v-form ref="form"  class="px-3" v-model="valid">
          <v-text-field v-model="cargo" counter="20" :rules="cargoRules" label="Cargo" required></v-text-field>

          <v-textarea v-model="descrip" label="Descripción" required></v-textarea>

          <v-select v-model="selSeniority" :items="seniority" 
            :rules="[v => !!v || 'Seniority es requerido']"
            label="Seniority" required
          ></v-select>

            <v-select v-model="selArea" :items="area"
            :rules="[v => !!v || 'Área es requerida']"
            label="Área" required
          ></v-select>

          <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate" :loading="loading">Agregar</v-btn>

        </v-form>

        </v-card-text>
      </v-card>

    </v-dialog>
    </nav>
</template>


<script>
import {mapState} from "vuex"
import { db } from "@/firebase";

export default {
  //data: () => ({
data () {
    return {
    valid: true,
    dialog: false,
    loading: false,
    cargo: '',
    cargoRules: [
            v => !!v || 'Cargo es requerido',
            v => (v && v.length <= 20) || 'Cargo debe ser menor igual que 20 carácteres',
                ],
    descrip: '',
    selSeniority: null,
    seniority: ['Semi Senior','Senior'],
    selArea: null,
    area: ['Comercial','Desarrollo','Admin'],
    
  }},
  computed: {
    ...mapState(['usuario'])
  },
  methods: {
      validate () {
        if (this.$refs.form.validate()) {
          //this.snackbar = true
          this.loading = true
          const cargo = {
            cargo: this.cargo,
            descripcion: this.descrip,
            seniority: this.selSeniority,
            area: this.selArea

          }
          if(this.valid) {
                
                db.collection('cargo').add(cargo).then(() => {
                  console.log('cargo agregado')
                })
            } else {
                console.log('error al grabar');
                
            }
            this.loading = false
            this.dialog = false
            this.$refs.form.reset()
            this.$emit('cargoAdded')
            
        }
      },

    },

};
</script>

