<template>
  <v-form ref="form">
    <v-tabs vertical color="secondary">
      <v-tab> Allgemeine Daten </v-tab>
      <v-tab> Typspezifische Daten</v-tab>
      <v-tab> Einschlüsse</v-tab>
      <v-tab> Verbundene Befunde</v-tab>
      <v-tab> Kalenderdaten </v-tab>
      <v-tab> Messpunkte</v-tab>
      <v-tab v-if="structure_doc.key_values_visible">Zusatzattribute</v-tab>
      <v-tab> Abmessungen</v-tab>
      <v-tab v-if="structure_doc.colors_visible">Farbwerte</v-tab>
      <v-tab v-if="structure_doc.datings_visible">Datierungen</v-tab>
      <v-tab> Bilder</v-tab>
      <v-tab v-if="structure_doc.connected_objects_visible">Verbindungen</v-tab>

      <v-tab-item class="px-4">
          <v-text-field v-model="structure_doc.structurenumber" label="Befundnummer*(Pflichtfeld)" :rules="is_required"  hint="Geben sie hier die Befundnummer ein"></v-text-field>
          <v-text-field v-model="structure_doc.structurename" label="Kurzansprache" hint="Geben sie hier die Kurzansprache des Befundes an"></v-text-field>
        <v-text-field v-model="structure_doc.interpretation" label="Vorläufige Interpretation" ></v-text-field>
          <v-select v-model="structure_doc.section_id" label="Schnitt*(Pflichtfeld)" :rules="is_required" :items="availableSections" item-text="title" item-value="_id"> </v-select>
          <v-select v-model="structure_doc.excavation_id" label="Grabung*(Pflichtfeld)" :rules="is_required" :items="availableExcavations" item-text="title" item-value="_id"> </v-select>
          <v-textarea v-model="structure_doc.description" label="Allgemeine Beschreibung" hint="Geben sie hier eine Beschreibung für den Befund an"></v-textarea>
          <v-textarea v-model="structure_doc.localisation" label="Lokalisierung in Sondage" hint="Beschreiben sie wo der Befund sich befindet"></v-textarea>
          <v-radio-group v-model="structure_doc.structure_type" label="Befundtyp" >
            <v-radio label="Stratigraphische Einheit" value="stratigraphical"></v-radio>
            <v-radio label="Baulicher Bestand" value="building"></v-radio>
            <v-radio label="Überreste" value="remains"></v-radio>
          </v-radio-group>
      </v-tab-item>

      <v-tab-item class="px-4">
        <div v-if="structure_doc.structure_type === 'stratigraphical'">
          <v-textarea v-model="structure_doc.extension" label="Ausdehnung" hint="Geben sie hier die Dimensionen des Befundes an"></v-textarea>
          <v-text-field v-model="structure_doc.level" label="Niveau" hint="Geben sie hier das Niveau des Befundes an"></v-text-field>
          <v-text-field v-model="structure_doc.innerconsistency" label="Konsistenz Schichtinneres" hint="Beschreiben sie hier die innere Konsistenz der Schicht"></v-text-field>
          <v-text-field v-model="structure_doc.outerconsistency" label="Konsistenz Schichtäußeres" hint="Beschreiben sie hier die äußere Konsistenz der Schicht"></v-text-field>
        </div>

        <div v-if="structure_doc.structure_type === 'building'">
          <v-combobox v-model="structure_doc.construction_type" multiple :items="['Schalenmauer', 'durchgemauert', 'Gussmauerwerk', 'nicht definierbar']" label="Bauart"></v-combobox>
          <v-combobox v-model="structure_doc.wall_characteristics" multiple :items="['Quader', 'Bruchstein', 'Rollstein', 'Ziegel']" label="Mauerwerk"></v-combobox>
          <v-combobox v-model="structure_doc.construction_form" multiple label="Struktur" :items="['Ausgezwickelt', 'Keine', 'Kompartimente/Ausgleichslagen', 'Lagerhaft', 'Netz', 'Nicht erkennbar', 'Zwickel']" ></v-combobox>
          <v-textarea v-model="structure_doc.style_elements" label="Architekturelemente/Stilmerkmale"></v-textarea>
          <v-combobox v-model="structure_doc.material_type" label="Material" :items="['Lehmzeigel','Mischmauerwerk','Stein','Ziegel']"></v-combobox>
          <v-text-field v-if="structure_doc.material_type === 'Mischmauerwerk'" v-model="structure_doc.brick_proportion" label="Ziegelanteil in Prozent"></v-text-field>

          <v-text-field v-model="structure_doc.stone_size" label="Steingröße"></v-text-field>
          <v-text-field v-model="structure_doc.stone_material" label="Steinmaterial"></v-text-field>
          <v-text-field v-model="structure_doc.stone_processing" label="Steinbearbeitung"></v-text-field>
          <v-text-field v-model="structure_doc.spolia" label="Spolien"></v-text-field>

          <v-text-field v-model="structure_doc.brick_size" multiple label="Ziegelgröße"></v-text-field>
          <v-combobox v-model="structure_doc.brick_type" multiple label="Ziegelart" :items="['Mauerziegel','Gewölbeziegel','Dachziegel','Fortifikationsziegel']"></v-combobox>
          <v-combobox v-model="structure_doc.brick_charackteristics" multiple label="Herstellungsmerkmale Ziegel" :items="['Zeichen (erhaben, vertieft, Stempel)','Fingerstriche','Wischzeicehn, Tierspuren, usw.']"></v-combobox>

          <v-combobox v-model="structure_doc.binding" multiple label="Bindung" :items="['Feucht','Trocken','Mörtelbindung','Lehmbindung','Trockenmauerwerk']"></v-combobox>
          <v-combobox v-model="structure_doc.binding_composition" multiple label="Zusammensetzung" :items="['Sandig','Kalkik','']"></v-combobox>
          <v-select v-model="structure_doc.binding_size" multiple label="Korngröße" :items="['Grob (über 0,5 cm)','Mittel (bis 0,5 cm)','Fein (unter 0,3 cm)']"></v-select>
          <v-combobox v-model="structure_doc.binding_consistency" multiple label="Konsistenz" :items="['Sehr Fest','Fest','Locker','Sehr Locker','Bröselig']"></v-combobox>
          <v-combobox v-model="structure_doc.binding_additives" multiple label="Zuschlagstoffe" :items="['Kiesel','Kalkspatzen','Ziegelsplitt','Holzkohle','Stroh','Sonstiges']"></v-combobox>
          <v-combobox v-model="structure_doc.joint_type" multiple label="Fugenbild" :items="['Verstrichen','Herausgequollen','Kellenstrich','Sonstiges']"></v-combobox>
          <v-text-field v-model="structure_doc.joint_dimensions" label="Fugendimensionen"></v-text-field>

          <v-combobox v-model="structure_doc.plaster_processing" multiple label="Oberflächengestaltung" :items="['Geglättet (Kelle)','Überieben','Riesel','Geschlämmt','Farbe']"></v-combobox>
          <v-text-field v-model="structure_doc.plaster_strength" label="Stärke"></v-text-field>
          <v-text-field v-model="structure_doc.plaster_composition" label="Ausdehnung und Verlauf"></v-text-field>
          <v-text-field v-model="structure_doc.plaster_size" label="Zusammensetzung"></v-text-field>
          <v-text-field v-model="structure_doc.plaster_consistency" label="Konsistenz"></v-text-field>
          <v-text-field v-model="structure_doc.plaster_additives" label="Zuschlagstoffe (in cm)"></v-text-field>
          <v-text-field v-model="structure_doc.plaster_multi_layering" label="Merhlagigkeit"></v-text-field>
        </div>

        <div v-if="structure_doc.structure_type === 'remains'">
          <v-text-field  v-model="structure_doc.age" label="Alter"></v-text-field>
          <v-text-field  v-model="structure_doc.gender" label="Geschlecht"></v-text-field>
          <v-text-field v-model="structure_doc.pathology" label="Pathologie"></v-text-field>
          <v-text-field v-model="structure_doc.remaining_bones" label="Erhaltene Knochen"></v-text-field>
          <v-text-field v-model="structure_doc.burial_type" label="Bestattungsart"></v-text-field>
          <v-text-field v-model="structure_doc.grave_type" label="Grabtyp"></v-text-field>
          <v-text-field v-model="structure_doc.grave_construction" label="Grabkonstruktion"></v-text-field>
        </div>
      </v-tab-item>

      <v-tab-item class="px-4">
        <DocInclusions :inclusions="structure_doc.inclusions"/>
      </v-tab-item>

      <v-tab-item class="px-4">
        <v-subheader v-if="$route.params.structure_id === 'new'"> Befunde können erst nach dem speichern verbunden werden </v-subheader>
        <DocMatrix v-else :matrix="structure_doc.matrix"/>
      </v-tab-item>

      <v-tab-item class="px-4">
        <DocDates :dates="structure_doc.dates"/>
      </v-tab-item>

      <v-tab-item class="px-4">
        <DocMeasurings :measuring_points="structure_doc.measuring_points"/>
      </v-tab-item>

      <v-tab-item v-if="structure_doc.key_values_visible" class="px-4">
        <DocKeyValues :key_values="structure_doc.key_values"/>
      </v-tab-item>

      <v-tab-item class="px-4">
        <DocLengths :lengts="structure_doc.lengths"/>
      </v-tab-item>

      <v-tab-item class="px-4">
        <DocColors :colors="structure_doc.colors"/>
      </v-tab-item>

      <v-tab-item v-if="structure_doc.datings_visible" class="px-4">
        <DocDatings :dating="structure_doc.dating" />
      </v-tab-item>

      <v-tab-item v-if="structure_doc.connected_objects_visible" class="px-4">
        <DocConnectedObjects :connected_objects="structure_doc.connected_objects" />
      </v-tab-item>

      <v-tab-item class="px-4">
        <DocImages :images="structure_doc.images" />
      </v-tab-item>

    <v-btn v-on:click="logForm" color="secondary" class="py-6" tile depressed>Speichern</v-btn>
    <v-btn v-on:click="goBack" color="primary"  class="py-6" tile depressed>Abbrechen</v-btn>
    <v-btn @click="bottom_sheet = !bottom_sheet" class="py-6" tile depressed> Optionen</v-btn>

    </v-tabs>

    <v-bottom-sheet v-model="bottom_sheet">
      <v-sheet>
        <v-row justify="space-around">
          <v-checkbox v-model="structure_doc.key_values_visible" label="Zusatzattribute"></v-checkbox>
          <v-checkbox v-model="structure_doc.datings_visible" label="Datierungen"></v-checkbox>
          <v-checkbox v-model="structure_doc.connected_objects_visible" label="Verbindungen"></v-checkbox>
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
import {structuresdb, sectionsdb} from '../adress.js'
import * as munsell from 'munsell'
import DocInclusions from "./DocInclusions";
import DocDates from "./DocDates";
import DocMeasurings from "./DocMeasuringPoints";
import DocKeyValues from "./DocKeyValues";
import DocLengths from "./DocLengths";
import DocColors from "./DocColors";
import DocDatings from "./DocDatings";
import DocConnectedObjects from "./DocConnectedObjects";
import DocImages from "./DocImages";
import {excavationsdb} from "../adress";
import DocMatrix from "./DocMatrix";


export default {
  name: 'StructureCreation',
  components: {
    DocMatrix,
    DocImages, DocConnectedObjects, DocDatings, DocKeyValues, DocMeasurings, DocDates, DocInclusions, DocLengths, DocColors},
  data: function () {
    return {
      structure_doc: {
        _id: new Date().toISOString(),
        structurenumber: '',
        structurename: '',
        description: '',
        interpretation: '',
        structure_type: 'stratigraphical',
        localisation: '',
        section_id: '',
        excavation_id: '',
        // Stratigraphical
        extension: '',
        outerconsistency: '',
        innerconsistency: '',
        level: '',
        // Building
        construction_type: '',
        wall_characteristics: '',
        construction_form: '',
        style_elements: '',
        material_type: '',
        brick_proportion: '',

        stone_size: '',
        stone_material: '',
        stone_processing: '',
        spolia: '',

        brick_size: '',
        brick_type: '',
        brick_charackteristics: '',

        binding: '',
        binding_composition: '',
        binding_size: '',
        binding_consistency: '',
        binding_additives: '',
        joint_type: '',
        joint_dimensions: '',

        plaster_processing: '',
        plaster_strength: '',
        plaster_composition: '',
        plaster_size: '',
        plaster_consistency: '',
        plaster_additives: '',
        plaster_multi_layering: '',

        // Remains
        age: '',
        gender: '',
        pathology: '',
        remaining_bones: '',
        burial_type: '',
        grave_type: '',
        grave_construction: '',

        key_values_visible: false,
        datings_visible: false,
        connected_objects_visible: false,

        matrix: {
          lies_on: '',
          lies_under: '',
          interesects: '',
          intersected_by: '',
          equals: '',
          fills: ''
        },

        dating: {
          accuracy: '',
          dating_rough_from: '',
          dating_rough_to: '',
          dating_fine_from: '',
          dating_fine_from_era: '',
          dating_fine_to: '',
          dating_fine_to_era: '',
        },

        inclusions: [],
        dates: [],
        lengths: [],
        images: [],
        colors: [],
        connected_objects: [],
        measuring_points: [],
        key_values: [],
      },

      is_required: [v => !!v || 'Pflichtfeld'],

      bottom_sheet: false,
      overlayDisplay: 'none',
      prelimdate: '',
      measurings: '',
      niveau: '',
      availableSections: [],
      availableExcavations: [],
      error_dialog: false,
      error_message: ''

    }
  },
  created () {
    this.getDoc()
    this.getSections()
    this.getExcavations()
  },
  methods: {
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
      if(this.$route.params.structure_id !== 'new') {
        structuresdb.get(this.$route.params.structure_id).then(function (doc) {
          context.structure_doc = doc
          context.$emit('view',doc.structurenumber + ' bearbeiten')
        }).catch(function (err) {
          console.log(err)
        })
      }
      else {
        context.$emit('view','Neuen Befund erstellen')
        context.structure_doc.section_id = VueCookies.get('currentSection')
        context.structure_doc.excavation_id = context.$route.params.excavation_id
        let currentdate = new Date().toISOString()
        context.structure_doc.dates.push({id: new Date().toISOString(), title: 'Eintragungsdatum', date: currentdate.substr(8,2) + ' ' + currentdate.substr(5,2) + ' ' + currentdate.substr(0,4)})
      }
    },
    logForm: function () {
      if (this.$refs.form.validate()) {
        var context = this
        structuresdb.put(context.structure_doc, function callback(err, result) {
          if (!err) {
            context.$router.push({ name: 'SectionOverview', params: {
                campaign_id: context.$route.params.campaign_id,
                excavation_id: context.$route.params.excavation_id,
                section_id: context.$route.params.section_id }})
          }
        })
      }else {
        this.error_message = 'Bitte alle Pflichtfelder vor dem Speichern ausfüllen'
        this.error_dialog = true
      }
    },
    goBack: function () {
      var context = this
      this.$router.push({
        name: 'SectionOverview', params: {
          campaign_id: context.$route.params.campaign_id,
          excavation_id: context.$route.params.excavation_id,
          section_id: context.$route.params.section_id }})
    }
  }
}
</script>

<style scoped>
</style>
