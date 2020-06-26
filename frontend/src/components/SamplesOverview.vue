<template>
  <div>
      <v-list>
        <template v-for="(sample, i) in samples" >
          <v-list-item :key="i" v-on:click="modifysample(sample._id)">
            <v-list-item-content>
              <v-list-item-title> {{sample.samplenumber}} </v-list-item-title>
              <v-list-item-subtitle> {{sample.description}} </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider v-if="i !== samples.length - 1"></v-divider>
        </template>
      </v-list>
      <v-btn v-on:click="modifysample('new')" color="primary"> Probe hinzufügen</v-btn>
      <v-btn v-on:click="createpdf" color="secondary"> Liste erzeugen </v-btn>
  </div>
</template>

<script>
import VueCookies from "vue-cookies";
import jsPDF from "jspdf";

export default {
  name: 'samplesOverview',
  methods: {
    modifysample: function (item_id) {
      VueCookies.set('excavationTab', 3)
      this.$router.push({ name: 'SampleCreation', params: { excavation_id: this.$route.params.excavation_id, sample_id: item_id }})
    },
    createpdf () {
      this.pdf_doc = new jsPDF()
      var listitems = []
      this.samples.forEach(function (item) {
        listitems.push({
            Probennummer: item.samplenumber,
            Typ: item.sampletype,
            Datum: item.dates[0].date
          }
        )
      })
      var headers = [
        "Probennummer",
        "Typ",
        "Datum"
      ]

      this.pdf_doc.setFontSize(22);
      this.pdf_doc.text("Probenliste", 20, 20);
      this.pdf_doc.setFontSize(10);
      this.pdf_doc.table(20, 20, listitems , headers, { autoSize: true });
      this.pdf_doc.save('Probenliste.pdf')
    }
  },
  props: {
    samples: Array
  }
}

</script>

<style scoped>
</style>
