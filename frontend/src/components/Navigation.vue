<template>
  <div>
    <v-navigation-drawer app nav right v-model="drawer" color="#e8e4d9">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Digitales Feldbuch
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item v-for="item in items" :key="item.title" link :to="item.link">
        <v-list-item-content>
          <v-list-item-title>
            {{item.title}}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <!--v-list-item v-on:click="bottom_sheet = !bottom_sheet">
        <v-list-item-title>
          Datenbank
        </v-list-item-title>
      </v-list-item-->
    </v-navigation-drawer>
    <v-bottom-sheet v-model="bottom_sheet">
      <v-sheet>
        <v-text-field v-model="path" label="Pfad"></v-text-field>
        <v-btn v-on:click="savepath" color="secondary"> Speichern </v-btn>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import {setpath} from '../adress'

export default {
  name: 'Navigation',
  props: {
    drawer: Boolean
  },
  data: function () {
    return {
      bottom_sheet: false,
      path: '127.0.0.1:5984',
      items: [
        {link: "/home", title:"Startseite"},
        {link: "/campaigns", title: "Übergeordnete Projekte"},
        /*{link: "/excavation", title: "Grabungen" },
        {link: "/excavation/sections", title: "Schnitte"},
        {link: "/excavation/structures", title: "Befunde (SE)"},
        {link: "/excavation/finds", title: "Funde"},
        {link: "/excavation/samples", title: "Proben"}*/
      ]
    }
  },
  methods: {
    savepath (){
      setpath(this.path)
    }
  }
}

</script>

<style >

</style>
