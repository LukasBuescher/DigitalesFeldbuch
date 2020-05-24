<template>
  <v-form>
    <div>
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
      <v-btn v-on:click="selectExcavation('new')" color="secondary"> Grabung hinzufügen</v-btn>
    </div>
  </v-form>
</template>

<script>
import VueCookies from 'vue-cookies'
import {excavationsdb} from '../adress.js'
import ExcavationCreation from "./ExcavationForm";

export default {
  name: 'ExcavationsOverview',
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
      this.$router.push({ name: 'ExcavationForm', params: { campaign_id: this.campaign_id, excavation_id: item_id}})
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
