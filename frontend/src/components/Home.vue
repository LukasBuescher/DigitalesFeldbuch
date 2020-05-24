<template>
    <v-row justify="center">
      <v-card outlined class="ma-2" color="#BC987D" v-on:click="toCampaign" dark>
          <v-img :src="require('../assets/logo_campaign.png')" max-height="200" max-width="200" class="text--white align-end" contain></v-img>
        <v-card-title class="justify-center"> Projekt </v-card-title>
      </v-card>

    <v-card :disabled="!excavationIsSet" class="ma-2" color="#BC987D" v-on:click="toExcavation" dark>
          <v-img :src="require('../assets/logo_excavation.png')" max-height="200" max-width="200" class="text--white align-end" contain> </v-img>
          <v-card-title class="justify-center"> Ausgrabung </v-card-title>
      </v-card>

      <v-card :disabled="!sectionIsSet" class="ma-2" color="#BC987D" v-on:click="toSection(0)" dark>
          <v-img :src="require('../assets/logo_section.png')" max-height="200" max-width="200" class="text--white align-end" contain></v-img>
           <v-card-title class="justify-center"> Schnitte </v-card-title>
      </v-card>

      <v-card :disabled="!sectionIsSet" class="ma-2" color="#BC987D" v-on:click="toSection(1)" dark>
          <v-img :src="require('../assets/logo_structure.png')" max-height="200" max-width="200" class="text--white align-end" contain></v-img>
          <v-card-title class="justify-center"> Befunde </v-card-title>
      </v-card>

      <v-card :disabled="!sectionIsSet" class="ma-2" color="#BC987D" v-on:click="toSection(2)" dark>
          <v-img :src="require('../assets/logo_find.png')" max-height="200" max-width="200" class="text--white align-end" contain></v-img>
          <v-card-title class="justify-center"> Funde </v-card-title>
      </v-card>

      <v-card :disabled="!sectionIsSet" class="ma-2" color="#BC987D" v-on:click="toSection(3)" dark>
          <v-img :src="require('../assets/logo_probe.png')" max-height="200" max-width="200" class="text--white align-end" contain></v-img>
          <v-card-title class="justify-center"> Proben </v-card-title>
      </v-card>
    </v-row>

</template>

<script>
 import VueCookies from 'vue-cookies'
  export default {
    data: function (){
      return {
        excavationIsSet: false,
        excavation_id: '',
        campaignIsSet: false,
        campaign_id: '',
        sectionIsSet: false,
        section_id: ''
      }
    },
    created () {
      this.excavation_id = VueCookies.get('currentExcavation')
      if (this.excavation_id !== null) {
        this.excavationIsSet = true
      }
      this.campaign_id = VueCookies.get('currentCampaign')
      if (this.campaign_id !== null){
        this.campaignIsSet = true
      }
      this.section_id = VueCookies.get('currentSection')
      if( this.section_id !== null)
        this.sectionIsSet = true
      this.$emit('view','Digitales Feldbuch')
    },
    methods: {
      toCampaign: function (){
        if (this.campaignIsSet){
          this.$router.push({ name: 'CampaignCreation', params: { campaign_id: this.campaign_id}})
        }else {
          this.$router.push({name: 'CampaignsOverview'})
        }
      },
      toExcavation: function () {
        this.$router.push({ name: 'ExcavationForm', params: { campaign_id: this.campaign_id, excavation_id: this.excavation_id }})
      },
      toSection: function (excavation_tab) {
        VueCookies.set('excavationTab', excavation_tab)
        this.$router.push({ name: 'SectionOverview', params: { campaign_id: this.campaign_id, excavation_id: this.excavation_id, section_id: this.section_id }})
      }
    }
  }
</script>
<style scoped>
</style>
