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
    </v-list>
  </v-form>

</template>

<script>
import VueCookies from "vue-cookies";
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
    }
  },
  data: function () {
      return {
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
