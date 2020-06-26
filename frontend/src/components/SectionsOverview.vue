<template>
  <v-form>
    <v-list>
      <template v-for="(section, i) in sections">
        <v-list-item :key="i" v-on:click="modifySection(section._id)">
          <v-list-item-content>
            <v-list-item-title> {{section.title}} </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider v-if="i !== sections.length - 1"></v-divider>
      </template>
      <v-btn  v-on:click="newSection()" color="primary"> Schnitt hinzufügen</v-btn>
      <v-btn  @click="copy_overlay= true" color="primary"> Schnitte kopieren</v-btn>
    </v-list>
    <v-dialog v-model="copy_overlay" max-width="800">
      <v-card>
        <v-card-title>Schnitte kopieren</v-card-title>
        <v-card-text>
          <v-select v-model="selected_excavation_id" :items="excavations" item-text="title" item-value="_id" label="Grabung" hint="Grabung wählen, deren Schnitte kopiert werden sollen"> </v-select>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn v-on:click="copySections" color="secondary"> Hinzufügen </v-btn>
          <v-btn color="primary" @click="copy_overlay = false"> Abbrechen </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>

</template>

<script>
import VueCookies from "vue-cookies";
import {excavationsdb, sectionsdb} from "../adress";
export default {
  name: 'SectionsOverview',
  methods: {
    modifySection: function (item_id) {
      VueCookies.set('excavationTab', 1)
      VueCookies.set('currentSection',item_id)
      this.$router.push({ name: 'SectionOverview', params: { campaign_id: this.$route.params.campaign_id, excavation_id: this.$route.params.excavation_id, section_id: item_id }})
    },
    newSection: function () {
      this.$router.push({ name: 'SectionCreation', params: { campaign_id: this.$route.params.campaign_id, excavation_id: this.$route.params.excavation_id, section_id: 'new' }})
    },
    copySections: function () {
        var context = this
        sectionsdb.allDocs({
          include_docs: true,
          attachments: true
        }).then(function (result) {
          for (let item of result.rows) {
            if (item.doc.excavation_id === context.selected_excavation_id) {
              item.doc.excavation_id = context.$route.params.excavation_id
              item.doc._id = new Date().toISOString()
              delete item.doc._rev
              console.log(item.doc)
              sectionsdb.put(item.doc, function callback(err, result){})
              context.sections.push(item.doc)
            }
          }
        }).catch(function (err) {
          console.log(err)
        })
        this.copy_overlay = false
    },
    getExcavations: function () {
      var context = this
      excavationsdb.allDocs({
        include_docs: true,
        attachments: true
      }).then(function (result) {
        for (let item of result.rows) {
          if (item.doc.campaign_id === context.$route.params.campaign_id) context.excavations.push(item.doc)
        }
      }).catch(function (err) {
        console.log(err)
      })
    },
  },
  created() {
    this.getExcavations()
  },
  data: function () {
      return {
        copy_overlay: false,
        selected_excavation_id: '',
        excavations: []
      }
  },
  props:{
    sections: Array
  }
}

</script>

<style scoped>

</style>

<style scoped>
</style>
