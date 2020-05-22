<template>
  <v-form ref="form">
    <v-tabs vertical color="secondary">
        <v-tab>Allgemeine Daten</v-tab>
        <v-tab>Messpunkte</v-tab>
        <v-tab>Abmessungen</v-tab>
        <v-tab>Interpretation</v-tab>
        <v-tab>Kalenderdaten </v-tab>
        <v-tab v-if="find_doc.key_values_visible">Zusatzattribute</v-tab>
        <v-tab v-if="find_doc.colors_visible">Farbwerte</v-tab>
        <v-tab v-if="find_doc.datings_visible">Datierungen</v-tab>
        <v-tab v-if="find_doc.connected_objects_visible">Verbindungen</v-tab>
        <v-tab v-if="find_doc.images_visible">Bilder</v-tab>

      <v-tab-item class="px-4">
          <v-text-field v-model="find_doc.findnumber" label="Fundnummer *" hint="Geben sie hier die Fundnummer ein *(Pflichtfeld)" :rules="is_required"></v-text-field>
          <v-textarea v-model="find_doc.description" label="Beschreibung" hint="Geben sie hier eine kurze Beschreibung des Fundes an"></v-textarea>
          <v-select v-model="find_doc.condition" label="Erhaltungszustand" :items="availableConditions" hint="Geben sie hier den Zustand des Fundes ein"></v-select>
          <v-select v-model="find_doc.excavation_id" label="Zugehörige Grabung *" :items="availableExcavations" item-value="_id" item-text="title" :rules="is_required" hint=" *(Pflichtfeld)"> </v-select>
          <v-select v-model="find_doc.section_id" label="Zugehöriger Schnitt *" :items="availableSections" item-value="_id" item-text="title" :rules="is_required" hint=" *(Pflichtfeld)"> </v-select>
          <v-select v-model="find_doc.structure_id" label="Zugehöriger Befund *" :items="availableStructures" item-value="_id" item-text="structurenumber" :rules="is_required" hint="Zugehörigen Befund oder Streufund angeben *(Pflichtfeld)"> </v-select>
          <v-checkbox v-model="find_doc.measured" label="Eingemessen" > </v-checkbox>
          <v-combobox v-model="find_doc.materials" label="Fundmaterial *" hint="*(Pflichtfeld)" :items="availableMaterials" :rules="is_required" multiple></v-combobox>
          <v-combobox v-model="find_doc.types" label="Fundtypen" :items="availableTypes"></v-combobox>
      </v-tab-item>

      <v-tab-item class="px-4">
        <DocMeasuringPoints :measuring_points="find_doc.measuring_points" />
      </v-tab-item>

      <v-tab-item class="px-4">
        <DocLengths :lengths="find_doc.lengths" />
      </v-tab-item>

      <v-tab-item class="px-4">
        <v-text-field v-model="find_doc.creator" label="Erzeuger" hint="Geben sie hier den Erzeuger des Fundes an"></v-text-field>
        <v-text-field v-model="find_doc.origin" label="Herkunft" hint="Geben sie hier die Herkunft des Fundes an"></v-text-field>
        <v-text-field v-model="find_doc.characteristics" label="Inschriften" hint="Geben sie hier, falls vorhanden, Inschriften oder besondere Merkmale an"></v-text-field>
        <v-text-field v-model="find_doc.literature" label="Literatur" hint="Geben sie hier relevante Literatur an"></v-text-field>
      </v-tab-item>

      <v-tab-item class="px-4">
        <DocDates :dates="find_doc.dates"/>
      </v-tab-item>

      <v-tab-item v-if="find_doc.key_values_visible" class="px-4">
        <DocKeyValues :key_values="find_doc.key_values"/>
      </v-tab-item>


      <v-tab-item v-if="find_doc.colors_visible" class="px-4">
        <DocColors :colors="find_doc.colors"/>
      </v-tab-item>

      <v-tab-item v-if="find_doc.datings_visible" class="px-4">
        <DocDatings :dating="find_doc.dating"/>
      </v-tab-item>

      <v-tab-item v-if="find_doc.connected_objects_visible" class="px-4">
        <DocConnectedObjects :connected_objects="find_doc.connected_objects"/>
      </v-tab-item>

      <v-tab-item v-if="find_doc.images_visible" class="px-4">
        <DocImages :images="find_doc.images"/>
      </v-tab-item>

      <v-btn v-on:click="logForm" color="secondary" class="py-6" tile depressed>Speichern</v-btn>
      <v-btn v-on:click="goBack" color="primary"  class="py-6" tile depressed>Abbrechen</v-btn>
      <v-btn @click="bottom_sheet = !bottom_sheet" class="py-6" tile depressed> Optionen</v-btn>
    </v-tabs>

    <v-bottom-sheet v-model="bottom_sheet">
      <v-sheet>
        <v-row justify="space-around">
          <v-checkbox v-model="find_doc.dates_visible" label="Kalenderdaten" hint=""></v-checkbox>
          <v-checkbox v-model="find_doc.measurings_visible" label="Messpunkte"></v-checkbox>
          <v-checkbox v-model="find_doc.key_values_visible" label="Zusatzattribute"></v-checkbox>
          <v-checkbox v-model="find_doc.colors_visible" label="Farbwerte"></v-checkbox>
          <v-checkbox v-model="find_doc.datings_visible" label="Datierungen"></v-checkbox>
          <v-checkbox v-model="find_doc.images_visible" label="Bilder"></v-checkbox>
          <v-checkbox v-model="find_doc.connected_objects_visible" label="Verbindungen"></v-checkbox>
        </v-row>
      </v-sheet>
    </v-bottom-sheet>

  <v-alert v-model="error_dialog" type="error" dense outlined dismissible>
    {{error_message}}
  </v-alert>
  </v-form>
</template>

<script>
import VueCookies from 'vue-cookies'
import { sectionsdb, structuresdb, findsdb} from '../adress.js'
import DocColors from "./DocColors";
import DocLengths from "./DocLengths";
import DocDates from "./DocDates";
import DocMeasuringPoints from "./DocMeasuringPoints";
import DocKeyValues from "./DocKeyValues";
import DocDatings from "./DocDatings";
import DocConnectedObjects from "./DocConnectedObjects";
import DocImages from "./DocImages";
import {excavationsdb} from "../adress";


export default {
  name: 'FindCreation',
  components: {DocImages, DocConnectedObjects, DocDatings, DocKeyValues, DocMeasuringPoints, DocDates, DocLengths, DocColors},
  data: function () {
    return {
      find_doc: {
        _id: new Date().toISOString(),
        findnumber: '',
        structure_id: 'Streufund',
        section_id: '',
        description: '',
        types: [],
        materials: [],
        excavation_id: '',
        measured: false,

        creator: '',
        origin: '',
        condition: '',
        literature: '',
        characteristics: '',

        colors: [],
        dating: {
          accuracy: '',
          dating_rough_from: '',
          dating_rough_to: '',
          dating_fine_from: '',
          dating_fine_from_era: '',
          dating_fine_to: '',
          dating_fine_to_era: '',
        },
        connected_objects: [],
        lengths: [],
        key_values: [],
        measuring_points: [],
        dates: [],
        images: [],

        images_visible: false,
        key_values_visible: false,
        colors_visible: false,
        datings_visible: false,
        connected_objects_visible: false
      },
      availableConditions: [
        'Vollständig',
        'Fragmentarisch',
        'Vollständig zerstört'
      ],

      availableMaterials: [
        'Metall',
        'Gold',
        'Silber',
        'Kupferlegierung',
        'Blei',
        'Eisen',
        'Unbestimmt',
        'Glas',
        'Stein',
        'Mörtel/Putz',
        'Knochen',
        'Organische Reste',
        'Ziegel',
        'Keramik',
        'Terra Sigillata (TS)',
        'Glanztonware',
        'Terra Nigra',
        'Terra Rubra',
        'Marmorierte Ware',
        'Goldglimmerware',
        'Glasierte Ware',
        'Backplatten',
        'Glattwandige Ware',
        'Rauwandige Ware',
        'Schwerkeramik',
        'Amphoren',
        'Frei geformte Ware',
        'Mittelalter/Neuzeit Keramik',
        'Mittelalter/Neuzeit Glas',
        'Schiefer',
        'Muschel'
      ],

      lastUsedMaterials: [],
      lastUsedTypes: [],
      affiliatedMaterial: '',

      availableTypes: [
        'Fibel',
        'Schmuck',
        'Münze',
        'Objekt',
        'Schlacke',
        'Militaria',
        'Gefäß',
        'Fensterglas',
        'Nägel',
        'Beschläge',
        'Kugeln',
        'Randstück (RS)',
        'Wandstück (WS)',
        'Bodenstück (BS)',
        'Henkelstück (HS)',
        'Deckelstück (DS)',
        'Amphorenstöpsel',
        'Werkzeug',
        'Spielzeug',
        'Produktionsrückstand',
        'Wandmalerei',
        'Boden',
        'Mosaik',
        'Statuette',
        'Plastik',
        'Rohr',
        'Baumaterial'
      ],
      availableStructures: [],
      availableSections: [],
      availableFinds: [],
      availableExcavations: [],

      is_required: [v => !!v || 'Pflichtfeld'],

      error_dialog: false,
      error_message: '',
      bottom_sheet: false

    }
  },
  created() {
    this.get_doc()
    this.getMaterials()
    this.getTypes()
    this.getExcavations()
    this.getStructures()
    this.getSections()
  },
  methods: {
    get_doc () {
      var context = this
      if(this.$route.params.find_id !== 'new') {findsdb.get(this.$route.params.find_id).then(function (doc) {
          context.find_doc = doc
          context.$emit('view',doc.findnumber + ' bearbeiten')
        }).catch(function (err) {
          console.log(err)
        })
        context.$emit('view',this.find_doc.findnumber + ' bearbeiten')
      }
      else {
        context.$emit('view','Neuen Fund erstellen')
        context.find_doc.excavation_id = context.$route.params.excavation_id
        context.find_doc.section_id = VueCookies.get('currentSection')
        let currentdate = new Date().toISOString()
        context.find_doc.dates.push({id: new Date().toISOString(), title: 'Eintragungsdatum', date: currentdate.substr(8,2) + ' ' + currentdate.substr(5,2) + ' ' + currentdate.substr(0,4)})
      }
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
      context.availableStructures.push({_id: 'Streufund', structurenumber: 'Streufund'})
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
    getTypes: function () {
      var context = this
      context.availableTypes.sort()
      if (VueCookies.get("lastUsedType1") != null) context.lastUsedTypes.push(VueCookies.get("lastUsedType1"))
      if (VueCookies.get("lastUsedType2") != null) context.lastUsedTypes.push(VueCookies.get("lastUsedType2"))
      if (VueCookies.get("lastUsedType3") != null) context.lastUsedTypes.push(VueCookies.get("lastUsedType3"))
    },
    getMaterials: function () {
      var context = this // to enable accessing the 'contactPersons' variable inside submethods
      context.availableMaterials.sort()
      if (VueCookies.get("lastUsedMaterial1") != null) context.lastUsedMaterials.push(VueCookies.get("lastUsedMaterial1"))
      if (VueCookies.get("lastUsedMaterial2") != null) context.lastUsedMaterials.push(VueCookies.get("lastUsedMaterial2"))
      if (VueCookies.get("lastUsedMaterial3") != null) context.lastUsedMaterials.push(VueCookies.get("lastUsedMaterial3"))
    },

    logForm: function () {
      this.error_message = ' '
      if (!this.$refs.form.validate()) {
        this.error_message = this.error_message.concat('Bitte alle Pflichtfelder vor dem Speichern ausfüllen')
        this.error_dialog = true
      }
      if ((this.find_doc.measured === true) && (this.find_doc.measuring_points.length === 0)) {
        if(this.error_message !== '') {
          this.error_message = this.error_message.concat('; ')
        }
        this.error_message = this.error_message.concat('Bitte einen Messpunkt anfügen')
        this.error_dialog = true
      }
      if (this.find_doc.lengths.length === 0){
        if(this.error_message !== '') {
          this.error_message = this.error_message.concat('; ')
        }
        this.error_message = this.error_message.concat('Bitte Abmessungen (Länge/Breite) anfügen')
        this.error_dialog = true
      }
      if(this.error_dialog === false) {
        if ((this.affiliatedMaterial !== '') && (this.affiliatedMaterial !== VueCookies.get("lastUsedMaterial1"))
          && (this.affiliatedMaterial !== VueCookies.get("lastUsedMaterial2")) && (this.affiliatedMaterial !== VueCookies.get("lastUsedMaterial3"))) {
          if (VueCookies.get("lastUsedMaterial2") != null)
            VueCookies.set("lastUsedMaterial3", VueCookies.get("lastUsedMaterial2"))
          if (VueCookies.get("lastUsedMaterial1") != null)
            VueCookies.set("lastUsedMaterial2", VueCookies.get("lastUsedMaterial1"))
          VueCookies.set("lastUsedMaterial1", this.affiliatedMaterial)
        }
        if (((this.type !== VueCookies.get("lastUsedType1")) && (this.type !== VueCookies.get("lastUsedType2")))
          && (this.type !== VueCookies.get("lastUsedType3")) && (this.type !== '')
        ) {
          if (VueCookies.get("lastUsedType2") != null)
            VueCookies.set("lastUsedType3", VueCookies.get("lastUsedType2"))
          if (VueCookies.get("lastUsedType1") != null)
            VueCookies.set("lastUsedType2", VueCookies.get("lastUsedType1"))
          VueCookies.set("lastUsedType1", this.type)
        }
        let context = this
        findsdb.put(this.find_doc, function callback(err, result) {
          if (!err) {
            context.$router.push({
              name: 'ExcavationOverview',
              params: {excavation_id: context.$route.params.excavation_id}
            })
          }
        })
      }
     },
    goBack: function () {
      this.$router.push({ name: 'ExcavationOverview', params: { excavation_id: this.$route.params.excavation_id }})
      },
  }
}
</script>

<style scoped>
</style>
