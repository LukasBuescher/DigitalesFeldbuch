<template>
  <v-form ref="form">
    <v-tabs vertical color="secondary">
      <v-tab> Allgemeine Daten </v-tab>
      <v-tab> Kontaktpersonen</v-tab>
      <v-tab> Messpunkte </v-tab>
      <v-tab> Abmessungen </v-tab>
      <v-tab> Bilder </v-tab>

      <v-tab-item class="px-4">
        <v-text-field v-model="section_doc.title" label="Schnittname *" hint="Geben Sie die Bezeichnung des Schnitts ein *(Pflichtfeld)" :rules="is_required" ></v-text-field>
        <v-textarea v-model="section_doc.description" label="Beschreibung"></v-textarea>
        <v-select v-model="section_doc.excavation_id" label="Grabung *" hint="*(Pflichtfeld)" :rules="is_required" :items="availableExcavations" item-text="title" item-value="_id"> </v-select>
      </v-tab-item>

      <v-tab-item class="px-4">
        <DocDates :dates="section_doc.dates"/>
      </v-tab-item>

      <v-tab-item class="px-4">
        <DocMeasuringPoints :measuring_points="section_doc.measuring_points"/>
      </v-tab-item>

      <v-tab-item class="px-4">
        <DocLengths :lengths="section_doc.lengths"/>
      </v-tab-item>

      <v-tab-item class="px-4">
        <DocImages :images="section_doc.images" />
      </v-tab-item>

      <v-btn v-on:click="logForm" color="secondary"  class="py-6" tile depressed>Speichern</v-btn>
      <v-btn v-on:click="goBack" color="primary"  class="py-6" tile depressed>Abbrechen</v-btn>

    </v-tabs>
    <v-alert v-model="error_dialog" type="error" dense outlined dismissible>
      {{error_message}}
    </v-alert>
  </v-form>
</template>

<script>
import {sectionsdb, excavationsdb} from '../adress.js'
import DocLengths from "./DocLengths";
import DocDates from "./DocDates";
import DocMeasuringPoints from "./DocMeasuringPoints";
import DocImages from "./DocImages";
import VueCookies from "vue-cookies";

export default {
  name: 'SectionCreation',
  components: {
    DocDates, DocMeasuringPoints, DocLengths, DocImages
  },
  data: function () {
    return {
      section_doc: {
        _id: new Date().toISOString(),
        title: '',
        persons: [],
        dates: [],
        images: [],
        measuring_points: [],
        lengths: [],
        excavation_id: ''
      },
      availableExcavations: [],
      is_required: [v => !!v || 'Pflichtfeld'],
      error_dialog: false,
      error_message: ''
    }
  },
  created() {
    this.getDoc()
    this.getExcavations()
  },
  methods: {
    logForm: function () {
        if (this.$refs.form.validate()) {
          var context = this
          let router = this.$router
          sectionsdb.put(context.section_doc, function callback(err, result) {
            if (!err) {
              if(this.$route.params.section_id === 'new') {
                VueCookies.set('currentSection', this.section_doc._id)
                VueCookies.set('excavationTab', 0)
                router.push({name: 'ExcavationForm', params: {excavation_id: context.section_doc.excavation_id}})
              }
            }
          })
        } else {
          this.error_message = 'Bitte alle Pflichtfelder vor dem Speichern ausfüllen'
          this.error_dialog = true
        }
    },
    getDoc: function () {
      var context = this
      if (this.$route.params.section_id !== 'new') {
        sectionsdb.get(this.$route.params.section_id).then(function (doc) {
          context.section_doc = doc
          context.$emit('view',doc.title + ' bearbeiten')
        }).catch(function (err) {
          console.log(err)
        })
      } else {
        context.$emit('view','Neuen Schnitt anlegen')
        context.section_doc.excavation_id = context.$route.params.excavation_id
        let currentdate = new Date().toISOString()
        context.section_doc.dates.push({id: new Date().toISOString(), title: 'Eintragungsdatum', date: currentdate.substr(8,2) + ' ' + currentdate.substr(5,2) + ' ' + currentdate.substr(0,4)})
      }
    },
    getExcavations () {
      let context = this
      excavationsdb.allDocs({
        include_docs: true,
        attachments: true
      }).then(function (result) {
        for (let item of result.rows) {
          context.availableExcavations.push(item.doc)
        }
      })
    },
    goBack: function () {
      this.$router.push({name: 'ExcavationForm'})
    }
  }
}
</script>

<style scoped>
</style>
