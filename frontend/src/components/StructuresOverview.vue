<template>
  <div>
    <v-list>
      <template v-for="(structure, i) in structures">
       <v-list-item :key="i" v-on:click="modifyStructure(structure._id)">
        <v-list-item-content>
          <v-list-item-title> {{structure.structurenumber}} </v-list-item-title>
          <v-list-item-subtitle> {{structure.structurename}} </v-list-item-subtitle>
        </v-list-item-content>
       </v-list-item>
       <v-divider v-if="i !== structures.length - 1"></v-divider>
      </template>
    </v-list>
    <v-btn v-on:click="modifyStructure('new')" color="primary"> Befund hinzufügen </v-btn>
  </div>
</template>

<script>
import VueCookies from "vue-cookies";

export default {
  name: 'StructuresOverview',
  methods: {
    modifyStructure: function (item_id) {
      VueCookies.set('excavationTab', 2)
      this.$router.push({ name: 'StructureCreation', params: { excavation_id: this.$route.params.excavation_id, structure_id: item_id }})
    }
  },
  props: {
    structures: Array
  }
}
</script>

<style scoped>
</style>
