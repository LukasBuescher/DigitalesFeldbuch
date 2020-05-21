<template>
  <v-form>
    <v-list>
      <template v-for="(section, i) in sections" v-if="!select_section" >
        <v-list-item :key="i" v-on:click="modifySection(section._id)">
          <v-list-item-content>
            <v-list-item-title> {{section.title}} </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider v-if="i !== sections.length - 1"></v-divider>
      </template>
      <template v-for="(section2, j) in sections" v-if="select_section">
        <v-list-item :key="j" v-on:click="selectSection(section2)">
          <v-list-item-content>
            <v-list-item-title> {{section2.title}} </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider v-if="j !== sections.length - 1"></v-divider>
      </template>
    </v-list>
    <v-btn v-if="!select_section" v-on:click="modifySection('new')" color="primary"> Schnitt hinzufügen</v-btn>
  </v-form>

</template>

<script>
import {sectionsdb} from '../adress.js'
import VueCookies from "vue-cookies";
export default {
  name: 'SectionsOverview',
  methods: {
    getSections: function () {
      var context = this // to enable accessing the 'campaigns' variable inside submethods
      sectionsdb.allDocs({
        include_docs: true,
        attachments: true
      }).then(function (result) {
        for (let item of result.rows) {
          if (item.doc.excavation_id === context.excavation_id) {
            context.sections.push(item.doc)
          }
        }
      }).catch(function (err) {
        console.log(err)
      })
      context.sections.sort()
    },
    selectSection: function (item) {
      this.$emit('sectionselect', item._id)
    },
    modifySection: function (item_id) {
      VueCookies.set('excavationTab', 1)
      this.$router.push({ name: 'SectionCreation', params: { section_id: item_id }})
    }
  },
  created () {
    this.getSections()
  },
  data: function () {
      return {
          sections: []
      }
  },
  props:{
    select_section: Boolean,
    excavation_id: String
  }
}

</script>

<style scoped>

</style>

<style scoped>
</style>
