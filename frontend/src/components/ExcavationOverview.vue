<template>
  <div>
    <v-tabs v-model="tab_control" grow background-color="#B3A27C" color="secondary" dark :disabled="select_section">
      <v-tab> Allgemeines </v-tab>
      <v-tab> Schnitte </v-tab>
      <v-tab> Befunde </v-tab>
      <v-tab> Funde </v-tab>
      <v-tab> Proben </v-tab>
    </v-tabs>

    <div v-if="tab_control !== 0">
      <v-btn v-if="current_section_id === null" v-on:click="changeSection" color="secondary" class="ma-2"> Schnitt wählen</v-btn>
      <v-btn v-if="current_section_id !== null" v-on:click="changeSection" color="secondary" class="ma-2"> Gewählter Schnitt: {{this.current_section_title}}</v-btn>
      <v-btn v-if="select_section" color="primary" v-on:click="cancelSection"> Auswahl abbrechen </v-btn>
    </div>

    <v-tabs-items v-model="tab_control">
      <v-tab-item>
        <ExcavationCreation :excavation_id="excavation_id"/>
      </v-tab-item>
      <v-tab-item>
        <SectionsOverview :excavation_id="excavation_id" :select_section="select_section" :select_tab="select_tab" @sectionselect="sectionChange"/>
      </v-tab-item>
      <v-tab-item>
        <StructuresOverview :structures="structures"/>
      </v-tab-item>
      <v-tab-item>
        <FindsOverview :finds="finds"/>
      </v-tab-item>
      <v-tab-item>
        <SamplesOverview :samples="samples"/>
      </v-tab-item>
    </v-tabs-items>

  </div>
</template>

<script>
  import SectionsOverview from "./SectionsOverview";
  import ExcavationCreation from "./ExcavationForm";
  import StructuresOverview from "./StructuresOverview";
  import FindsOverview from "./FindsOverview";
  import SamplesOverview from "./SamplesOverview";
  import VueCookies from 'vue-cookies'
  import { excavationsdb, sectionsdb, structuresdb, samplesdb, findsdb } from '../adress.js'

export default {
  name: 'ExcavationOverview',
  components: {
    ExcavationCreation,
    SamplesOverview,
    FindsOverview,
    StructuresOverview,
    SectionsOverview
  },
  data: function () {
    return {
      excavation_id: '',
      tab_control: 0,
      current_section_title: null,
      current_section_id: null,
      select_section: false,
      select_tab: null,
      structures: [],
      samples: [],
      finds: []
    }
  },
  methods: {
    changeSection(){
      this.select_section = true
      this.select_tab = this.tab_control.valueOf()
      this.tab_control = 1
    },
    cancelSection(){
      this.select_section = false
      this.tab_control = this.select_tab
    },
    getArray: function (database) {
      let context = this
      let new_array = []
      database.allDocs({
        include_docs: true,
        attachments: true
      }).then(function (result) {
        for (let item of result.rows) {
          if (context.current_section_id === item.doc.section_id)
            new_array.push(item.doc)
        }
      }).catch(function (err) {
        console.log(err)
      })
      return new_array
    },
    sectionChange(item_id){
      let context = this
      VueCookies.set('currentSection', item_id)
      sectionsdb.get(item_id).then(function (doc) {
        context.current_section_title = doc.title
        context.current_section_id = doc._id
      }).catch(function (err) {
        console.log(err);
      });
      this.structures = this.getArray(structuresdb)
      this.samples = this.getArray(samplesdb)
      this.finds = this.getArray(findsdb)
      this.select_section = false
      this.tab_control = this.select_tab
    }
  },
  created () {
    let context = this
    this.excavation_id = this.$route.params.excavation_id
    excavationsdb.get(this.excavation_id).then(function (doc) {
      context.$emit('view', doc.title + ` bearbeiten`)
    }).catch(function (err) {
      console.log(err)
    });
    this.sectionChange(VueCookies.get('currentSection')
    )
    let new_tab_control = parseInt(VueCookies.get('excavationTab'))
    if(new_tab_control !== null){
      this.tab_control = new_tab_control
    }
  }

}

</script>

<style scoped>

</style>
