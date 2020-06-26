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
    <v-btn v-on:click="createpdf" color="secondary"> Liste erzeugen </v-btn>
  </div>
</template>

<script>
import VueCookies from "vue-cookies";
import jsPDF from "jspdf";

export default {
  name: 'StructuresOverview',
  methods: {
    modifyStructure: function (item_id) {
      VueCookies.set('excavationTab', 1)
      this.$router.push({ name: 'StructureCreation', params: { excavation_id: this.$route.params.excavation_id, structure_id: item_id }})
    },
    createpdf () {
      this.pdf_doc = new jsPDF()
      var listitems = []
      this.structures.forEach(function (item) {
        listitems.push({
            Befundnummer: item.structurenumber,
            Kurzansprache: item.structurename,
            Datum: item.dates[0].date
          }
        )
      })
      var headers = [
        "Befundnummer",
        "Kurzansprache",
        "Datum"
      ]

      this.pdf_doc.setFontSize(22);
      this.pdf_doc.text("Befundliste", 20, 20);
      this.pdf_doc.setFontSize(16);
      this.pdf_doc.table(20, 20, listitems , headers, { autoSize: true });
      this.pdf_doc.save('Befundliste.pdf')
    }
  },
  props: {
    structures: Array
  }
}
</script>

<style scoped>
</style>
