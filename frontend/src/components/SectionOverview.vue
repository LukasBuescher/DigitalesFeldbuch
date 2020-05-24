<template>
  <div>
    <v-tabs v-model="tab_control" grow background-color="#B3A27C" color="secondary" dark>
      <v-tab> Allgemeines </v-tab>
      <v-tab> Befunde </v-tab>
      <v-tab> Funde </v-tab>
      <v-tab> Proben </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab_control">
      <v-tab-item>
        <SectionForm />
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
  import SectionForm from "./SectionForm";
  import StructuresOverview from "./StructuresOverview";
  import FindsOverview from "./FindsOverview";
  import SamplesOverview from "./SamplesOverview";
  import VueCookies from 'vue-cookies'
  import { excavationsdb, sectionsdb, structuresdb, samplesdb, findsdb } from '../adress.js'

export default {
  name: 'SectionOverview',
  components: {
    SectionForm,
    SamplesOverview,
    FindsOverview,
    StructuresOverview
  },
  data: function () {
    return {
      campaign_id : '',
      excavation_id: '',
      section_id: '',
      tab_control: 0,
      current_section_title: null,
      current_section_id: null,
      select_tab: null,
      structures: [],
      samples: [],
      finds: []
    }
  },
  methods: {
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
  },
  created () {
    let context = this
    this.excavation_id = this.$route.params.excavation_id
    this.campaign_id = this.$route.params.excavation_id
    this.section_id = this.$route.params.section_id
    this.finds = this.getArray(findsdb)
    this.samples = this.getArray(samplesdb)
    this.structure = this.getArray(structuresdb)
    sectionsdb.get(this.section_id).then(function (doc) {
      context.$emit('view', doc.title + ` bearbeiten`)
    }).catch(function (err) {
      console.log(err)
    })
    let new_tab_control = parseInt(VueCookies.get('excavationTab'))
    if(new_tab_control !== null){
      this.tab_control = new_tab_control
    }
  }

}

</script>

<style scoped>

</style>
