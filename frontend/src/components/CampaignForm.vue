<template>
  <v-form ref="form">
    <v-tabs vertical color="secondary">
      <v-tab> Allgemeine Daten </v-tab>
      <v-tab-item class="px-4">
        <v-text-field v-model="campaign_doc.title" label="Bezeichnung *" hint="Geben sie hier die Bezeichnung des Projektes an *(Pflichtfeld)":rules="is_required"  ></v-text-field>
        <v-textarea v-model="campaign_doc.description" label="Beschreibung" hint="Geben sie hier eine kurze Beschreibung des Projektes an (Ziele, Foki etc.)"></v-textarea>
      </v-tab-item>

      <v-tab> Grabungen</v-tab>
      <v-tab-item class="px-4">
        <v-subheader v-if="is_new"> Grabungen können erst angelegt werden, wenn das Projekt gespeichert wurde </v-subheader>
        <ExcavationsOverview v-else v-on:save_excavation="logForm(false)"/>
      </v-tab-item>

      <v-tab> Kontaktpersonen </v-tab>
      <v-tab-item class="px-4">
        <DocContactPersons :persons="campaign_doc.persons"/>
      </v-tab-item>

      <!--v-tab> Pdf generieren <v-tab>
      <v-tab-item>
        <PdfComponent />
      </v-tab-item-->

      <v-btn v-on:click="logForm(true)" color="secondary" class="py-6" tile depressed>Speichern</v-btn>
      <v-btn v-on:click="goBack" color="primary"  class="py-6" tile depressed>Abbrechen</v-btn>

    </v-tabs>

    <v-alert v-model="error_dialog" type="error" dense outlined dismissible>
      {{error_message}}
    </v-alert>
  </v-form>
</template>

<script>
  import {campaignsdb} from '../adress.js'
  import ExcavationsOverview from './ExcavationsOverview'
  import VueCookies from 'vue-cookies'
  import DocContactPersons from "./DocContactPersons";
  import PdfComponent from "./PdfComponent";

  export default {
    name: 'CampaignCreation',
    components: {PdfComponent, DocContactPersons, ExcavationsOverview},
    data: function () {
      return {
        campaign_doc: {
          _id: new Date().toISOString(),
          title: '',
          description: '',
          persons: []
        },
        is_new: true,
        is_required: [v => !!v || 'Pflichtfeld'],

        error_message: '',
        error_dialog: false

      }
    },
    created() {
      this.get_doc()
    },
    methods: {
      get_doc () {
        var context = this
        if(this.$route.params.campaign_id !== 'new') {
          this.is_new = false
          campaignsdb.get(this.$route.params.campaign_id).then(function (doc) {
            context.campaign_doc = doc
            context.$emit('view',doc.title + ' bearbeiten')
          }).catch(function (err) {
            console.log(err)
          })
        } else {
          context.$emit('view','Neues Projekt anlegen')
        }
      },
      logForm: function (to_campaignsoverview) {
        if (this.$refs.form.validate()) {
          let context = this
          campaignsdb.put(this.campaign_doc, function callback(err, result) {
            if (!err) {
              if (to_campaignsoverview) {
                context.$router.push({name: 'CampaignsOverview'})
              }
            }
          })
        } else {
          this.error_message = this.error_message.concat('Bitte alle Pflichtfelder vor dem Speichern ausfüllen')
          this.error_dialog = true
        }
      },
      goBack: function () {
        // eslint-disable-next-line standard/object-curly-even-spacing
        this.$router.push({name: 'CampaignsOverview'})
      }
    }
  }
</script>

