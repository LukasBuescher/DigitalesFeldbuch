<template>
  <v-form ref="form">
    <v-tabs vertical color="secondary">
      <v-tab>Allgemeine Daten</v-tab>
      <v-tab> Kalenderdaten </v-tab>

      <v-tab-item class="px-4">
        <v-text-field v-model="sample_doc.samplenumber" label="Probennummer *" hint="Geben sie hier die Fundnummer ein *(Pflichtfeld)" :rules="is_required"></v-text-field>
        <v-select v-model="sample_doc.sampletype" labe="Probentyp" hint="Geben sie hier den Typ der Probe an *(Pflichtfeld)" :items="sampleTypes" :rules="is_required"> </v-select><v-textarea v-model="sample_doc.description" label="Beschreibung" hint="Geben sie hier eine kurze Beschreibung des Fundes an"></v-textarea>
        <v-select v-model="sample_doc.excavation_id" label="Zugehörige Grabung *" :items="availableExcavations" item-value="_id" item-text="title" :rules="is_required" hint=" *(Pflichtfeld)"> </v-select>
        <v-select v-model="sample_doc.section_id" label="Zugehöriger Schnitt *" :items="availableSections" item-value="_id" item-text="title" :rules="is_required" hint=" *(Pflichtfeld)"> </v-select>
        <v-select v-model="sample_doc.structure_id" label="Zugehöriger Befund *" :items="availableStructures" item-value="_id" item-text="structurenumber" :rules="is_required" hint="Zugehörigen Befund oder Streufund angeben *(Pflichtfeld)"> </v-select>
      </v-tab-item>

      <v-tab-item class="px-4">
        <DocDates :dates="sample_doc.dates"/>
      </v-tab-item>

      <v-btn v-on:click="logForm" color="secondary" class="py-6" tile depressed>Speichern</v-btn>
      <v-btn v-on:click="goBack" color="primary"  class="py-6" tile depressed>Abbrechen</v-btn>
    </v-tabs>

    <v-alert v-model="error_dialog" type="error" dense outlined dismissible>
      {{error_message}}
    </v-alert>
  </v-form>
</template>

<script>
import VueCookies from 'vue-cookies'
import {samplesdb, excavationsdb, sectionsdb, structuresdb} from "../adress";
import DocDates from "./DocDates";

export default {
  name: 'SampleCreation',
  components: {DocDates},
  data: function () {
    return {
      sample_doc: {
        _id: new Date().toISOString(),
        samplenumber: '',
        description: '',
        sampletype: 'Erdprobe',
        excavation_id: '',
        section_id: '',
        structure_id: '',
        dates: []
      },

      availableSections: [],
      availableExcavations: [],
      availableStructures: [],

      sampleTypes: [
        'Erdprobe',
        'Sonstige'
      ],

      error_dialog: false,
      error_message: '',
      is_required: [v => !!v || 'Pflichtfeld']
    }
  },
  created() {
    this.getSections()
    this.getStructures()
    this.getExcavations()
    this.getDoc()
  },
  methods: {
    logForm: function () {
      let context = this
      if (this.$refs.form.validate()){
        samplesdb.put(context.sample_doc, function callback(err, result) {
          if (!err) {
            context.$router.push({ name: 'SectionOverview', params: {
              campaign_id: context.$route.params.campaign_id,
                excavation_id: context.$route.params.excavation_id,
                section_id: context.$route.params.section_id }})
          }
        })
      } else {
        this.error_message = 'Bitte alle Pflichtfelder vor dem Speichern ausfüllen'
        this.error_dialog = true
      }
    },
    goBack: function () {
      let context = this
      this.$router.push({
        name: 'SectionOverview', params: {
          campaign_id: context.$route.params.campaign_id,
          excavation_id: context.$route.params.excavation_id,
          section_id: context.$route.params.section_id }})
    },
    getSections () {
      let context = this
      sectionsdb.allDocs({
        include_docs: true,
        attachments: true
      }).then(function (result) {
        for (let item of result.rows) {
          if (item.doc.excavation_id === context.$route.params.excavation_id) context.availableSections.push(item.doc)
        }
      })
    },
    getStructures () {
      let context = this
      structuresdb.allDocs({
        include_docs: true,
        attachments: true
      }).then(function (result) {
        for (let item of result.rows) {
          if (item.doc.excavation_id === context.$route.params.excavation_id) context.availableStructures.push(item.doc)
        }
      })
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
    getDoc () {
      var context = this
      if(context.$route.params.sample_id !== 'new') {
        samplesdb.get(context.$route.params.sample_id).then(function (doc) {
          context.sample_doc = doc
          context.$emit('view',doc.samplenumber + ' bearbeiten')
        }).catch(function (err) {
          console.log(err);
        });
      }else {
        context.sample_doc.excavation_id = context.$route.params.excavation_id
        context.sample_doc.section_id = VueCookies.get('currentSection')
        context.$emit('view','Neue Probe eintragen')
        let currentdate = new Date().toISOString()
        context.sample_doc.dates.push({id: new Date().toISOString(), title: 'Eintragungsdatum', date: currentdate.substr(8,2) + ' ' + currentdate.substr(5,2) + ' ' + currentdate.substr(0,4)})
      }
    }
  }
}
</script>


