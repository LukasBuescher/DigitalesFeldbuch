<template>
  <v-form ref="form">

    <v-tabs vertical color="secondary">

      <v-tab> Allgemeine Daten </v-tab>
      <v-tab-item class="px-4">
        <v-text-field v-model="excavation_doc.title" label="Bezeichnung *" hint="Geben sie hier die Bezeichnung der Grabung an *(Pflichtfeld)" :rules="is_required" ></v-text-field>
        <v-textarea v-model="excavation_doc.description" label="Beschreibung" hint="Geben sie hier eine kurze Beschreibung des Projektes an"></v-textarea>
        <v-text-field v-model="excavation_doc.organisation" label="Grabungsbeauftragter"></v-text-field>
        <v-text-field v-model="excavation_doc.customer" label="Beauftragende Organisation"></v-text-field>
        <v-text-field v-model="excavation_doc.location" label="Ort"></v-text-field>
        <v-text-field v-model="excavation_doc.excavationFocus" label="Grabungsfokus"></v-text-field>
        <v-select v-model="excavation_doc.campaign_id" :items="campaigns" item-text="title" item-value="_id" label="Zugehörige Grabung"> </v-select>
      </v-tab-item>


      <v-tab> Schnitte</v-tab>
      <v-tab-item>
        <SectionsOverview :sections="sections"/>
      </v-tab-item>

      <v-tab> Kalenderdaten</v-tab>
      <v-tab-item>
        <DocDates :dates="excavation_doc.dates"/>
      </v-tab-item>

      <v-tab> Kontaktpersonen</v-tab>
      <v-tab-item>
        <DocContactPersons :persons="excavation_doc.persons"/>
      </v-tab-item>

      <v-tab> Import</v-tab>
      <v-tab-item class="px-4">
        <PdfComponent/>
      </v-tab-item>


    <v-btn v-on:click="logForm" color="primary"  class="py-6" tile depressed> Speichern </v-btn>
    <v-btn v-on:click="goBack" color="secondary"  class="py-6" tile depressed> Abbrechen</v-btn>


   </v-tabs>
    <v-alert v-model="error_dialog" type="error" dense outlined dismissible>
      {{error_message}}
    </v-alert>
  </v-form>
</template>

<script>
import {excavationsdb, campaignsdb, sectionsdb, structuresdb, findsdb} from '../adress.js'
import VueCookies from 'vue-cookies'
import DocDates from "./DocDates";
import DocContactPersons from "./DocContactPersons";
import SectionsOverview from "./SectionsOverview";
import PdfComponent from "./PdfComponent";
import jsPDF from "jspdf";


export default {
  name: 'ExcavationForm',
  components: {PdfComponent, DocDates,DocContactPersons,SectionsOverview},
  data: function () {
    return {
      excavation_doc: {
        _id: new Date().toISOString(),
        description: '',
        title: '',
        organisation: '',
        customer: '',
        excavationFocus: '',
        location: '',
        campaign_id: '',
        dates: [],
        persons: []
      },
      input_file: '',
      input_text: '',
      excavation_id: '',
      campaign_id: '',
      campaigns: [],
      sections: [],
      error_dialog: false,
      error_message: '',
      pdf_doc: '',
      is_required: [v => !!v || 'Pflichtfeld']
    }
  },
  created () {
    this.excavation_id = this.$route.params.excavation_id
    this.campaign_id =  this.$route.params.campaign_id
    this.get_doc()
    this.get_campaigns()
    this.get_sections()
  },
  methods: {
    get_doc: function() {
      var context = this
      if(context.excavation_id !== 'new') {
        excavationsdb.get(context.excavation_id).then(function (doc) {
          context.excavation_doc = doc
          context.$emit('view',doc.title + ' bearbeiten')
        }).catch(function (err) {
          console.log(err)
        })
      } else {
        context.excavation_doc.campaign_id = this.campaign_id
        context.$emit('view','Neue Grabung anlegen')
        let currentdate = new Date().toISOString()
        context.excavation_doc.dates.push({id: new Date().toISOString(), title: 'Eintragungsdatum', date: currentdate.substr(8,2) + ' ' + currentdate.substr(5,2) + ' ' + currentdate.substr(0,4)})
      }
    },
    get_campaigns: function () {
      var context = this
      campaignsdb.allDocs({
        include_docs: true,
        attachments: true
      }).then(function (result) {
        for (let item of result.rows) {
          context.campaigns.push(item.doc)
        }
      }).catch(function (err) {
        console.log(err)
      })
      context.campaigns.sort()
    },
    get_sections: function () {
      var context = this
      sectionsdb.allDocs({
        include_docs: true,
        attachments: true
      }).then(function (result) {
        for (let item of result.rows) {
          if (item.doc.excavation_id === context.excavation_id) context.sections.push(item.doc)
        }
      }).catch(function (err) {
        console.log(err)
      })
    },
    logForm: function () {
      if (this.$refs.form.validate()) {
        var context = this
        VueCookies.set('excavationTab', 0)
        excavationsdb.put(this.excavation_doc, function callback(err, result) {
          if (!err) {
            context.$router.push({name: 'CampaignCreation', params: { campaign_id: context.campaign_id}})
          }
        })
      } else {
        this.error_message = 'Bitte alle Pflichtfelder vor dem Speichern ausfüllen'
        this.error_dialog = true
      }
    },
    goBack: function () {
      this.$router.push({ name: 'CampaignCreation', params: {campaign_id: this.campaign_id}})
    }
  }
}
</script>

<style scoped>

</style>
