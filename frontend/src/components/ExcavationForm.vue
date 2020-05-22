<template>
  <v-form ref="form">
    <v-text-field v-model="excavation_doc.title" label="Bezeichnung *" hint="Geben sie hier die Bezeichnung der Grabung an *(Pflichtfeld)" :rules="is_required" ></v-text-field>
    <v-textarea v-model="excavation_doc.description" label="Beschreibung" hint="Geben sie hier eine kurze Beschreibung des Projektes an"></v-textarea>
    <v-text-field v-model="excavation_doc.organisation" label="Grabungsbeauftragter"></v-text-field>
    <v-text-field v-model="excavation_doc.customer" label="Beauftragende Organisation"></v-text-field>
    <v-text-field v-model="excavation_doc.location" label="Ort"></v-text-field>
    <v-text-field v-model="excavation_doc.excavationFocus" label="Grabungsfokus"></v-text-field>
    <v-select v-model="excavation_doc.campaign_id" :items="campaigns" item-text="title" item-value="_id" label="Zugehörige Grabung"> </v-select>

    <v-btn v-on:click="logForm" color="primary"> Speichern </v-btn>
    <v-btn v-if="excavation_id === 'new'" v-on:click="$emit('cancel_creation')" color="secondary"> Abbrechen</v-btn>

    <v-alert v-model="error_dialog" type="error" dense outlined dismissible>
      {{error_message}}
    </v-alert>
  </v-form>
</template>

<script>
import {excavationsdb, campaignsdb} from '../adress.js'
import VueCookies from 'vue-cookies'



export default {
  name: 'ExcavationCreation',
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
        dates: []
      },
      campaigns: [],
      error_dialog: false,
      error_message: '',
      is_required: [v => !!v || 'Pflichtfeld']
    }
  },
  props: {
    excavation_id: String,
    campaign_id: String
  },
  created () {
    this.get_doc()
    this.get_campaigns()
  },
  methods: {
    get_doc () {
      var context = this
      if(context.excavation_id !== 'new') {
        excavationsdb.get(context.excavation_id).then(function (doc) {
          context.excavation_doc = doc
        }).catch(function (err) {
          console.log(err)
        })
      } else {
        context.excavation_doc.campaign_id = this.campaign_id
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
    logForm: function () {
      if (this.$refs.form.validate()) {
        var context = this
        VueCookies.set('excavationTab', 0)
        excavationsdb.put(this.excavation_doc, function callback(err, result) {
          if (!err) {
            context.$emit('save_excavation')
            context.$router.push({name: 'ExcavationOverview', params: {excavation_id: context.excavation_doc._id}})
          }
        })
      } else {
        this.error_message = 'Bitte alle Pflichtfelder vor dem Speichern ausfüllen'
        this.error_dialog = true
      }
    },
    goBack: function () {
      this.$router.push({ name: 'CampaignsOverview'})
    }
  }
}
</script>

<style scoped>

</style>
