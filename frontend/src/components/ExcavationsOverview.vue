<template>
  <v-form>
    <div v-if="!new_excavation">
      <v-subheader v-if="excavations.length === 0"> Bisher wurden dem Projekt keine Grabungen hinzugefügt</v-subheader>
      <v-subheader v-else>Zugehörige Grabungen</v-subheader>
      <v-list>
          <template v-for="(excavation, i) in excavations" >
            <v-list-item :key="i" v-on:click="selectExcavation(excavation._id)">
              <v-list-item-content>
                <v-list-item-title> {{excavation.title}} </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider v-if="i !== excavations.length - 1"></v-divider>
          </template>
        </v-list>
      <v-btn @click="new_excavation = true" color="secondary"> Grabung hinzufügen</v-btn>
    </div>
    <div v-else>
      <ExcavationCreation excavation_id="new" v-on:save_excavation="$emit(`save_excavation`)" v-on:cancel_creation="new_excavation = false" :campaign_id="campaign_id"/>
    </div>
  </v-form>
</template>

<script>
import VueCookies from 'vue-cookies'
import {excavationsdb} from '../adress.js'
import ExcavationCreation from "./ExcavationForm";

export default {
  name: 'ExcavationsOverview',
  components: {ExcavationCreation},
  methods: {
    getExcavations: function () {
      var context = this
      excavationsdb.allDocs({
        include_docs: true,
        attachments: true
      }).then(function (result) {
        for (let item of result.rows) {
          if (item.doc.campaign_id === context.campaign_id) context.excavations.push(item.doc)
        }
      }).catch(function (err) {
        console.log(err)
      })
    },
    selectExcavation: function (item_id) {
      this.$emit(`save_excavation`)
      VueCookies.set('currentExcavation', item_id)
      this.$router.push({ name: 'ExcavationOverview', params: { excavation_id: item_id}})
    }
  },
  beforeMount () {
    this.campaign_id = this.$route.params.campaign_id
    this.getExcavations()
  },
  data: function () {
    return {
      excavations: [],
      new_excavation: false,
      campaign_id: ''
    }
  }

}

</script>

<style scoped>
</style>
