<template>
  <div>
      <v-list>
        <template v-for="(find, i) in finds" >
          <v-list-item :key="i" v-on:click="modifyFind(find._id)">
            <v-list-item-content>
              <v-list-item-title> {{find.findnumber}} </v-list-item-title>
              <v-list-item-subtitle> {{find.description}} </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider v-if="i !== finds.length - 1"></v-divider>
        </template>
      </v-list>
      <v-btn v-on:click="modifyFind('new')" color="primary">Fund hinzufügen</v-btn>
      <v-btn v-on:click="createpdf" color="secondary"> Liste erzeugen </v-btn>
  </div>
</template>

<script>
import VueCookies from "vue-cookies";
import jsPDF from "jspdf";

export default {
  name: 'FindsOverview',
  methods: {
    modifyFind: function (item_id) {
      VueCookies.set('excavationTab', 2)
      this.$router.push({ name: 'FindCreation',  params: { excavation_id: this.$route.params.excavation_id, find_id: item_id }})
    },
    createpdf () {
      this.pdf_doc = new jsPDF()
      var listitems = []
      this.finds.forEach(function (item) {
        listitems.push({
            Fundnummer: item.findnumber,
            Material: item.materials[0],
            Datum: item.dates[0].date
          }
        )
      })
      var headers = [
        "Fundnummer",
        "Material",
        "Datum"
      ]

      this.pdf_doc.setFontSize(22);
      this.pdf_doc.text("Fundliste", 20, 20);
      this.pdf_doc.setFontSize(16);
      this.pdf_doc.table(20, 20, listitems , headers, { autoSize: true });
      this.pdf_doc.save('Fundliste.pdf')
    }
  },
  props:{
    finds: Array
  },
}

</script>

<style scoped>
</style>
