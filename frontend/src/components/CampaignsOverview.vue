<template>
  <v-form>
    <v-subheader v-if="campaigns.length === 0" > Bisher wurde kein Projekt angelegt</v-subheader>
    <v-list>
      <template v-for="(campaign, i) in campaigns" >
        <v-list-item :key="i" v-on:click="modifyCampaign(campaign._id)">
          <v-list-item-content>
            <v-list-item-title> {{campaign.title}} </v-list-item-title>
            <v-list-item-subtitle> {{campaign.description}} </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider v-if="i !== campaigns.length - 1"></v-divider>
      </template>
    </v-list>
    <v-btn v-on:click="modifyCampaign('new')" color="primary"> Projekt hinzufügen </v-btn>
  </v-form>
</template>

<script>
import VueCookies from 'vue-cookies'
import RestartButton from '../obsolete/RestartButton'
import {campaignsdb} from '../adress.js'



export default {

  name: 'CampaignsOverview',
  components: {RestartButton},
  methods: {
    getCampaigns: function () {
      var context = this // to enable accessing the 'campaigns' variable inside submethods
      campaignsdb.allDocs({
        include_docs: true,
        attachments: true
      }).then(function (result) {
        for (let item of result.rows) {
          context.campaigns.push(item.doc)
        }
      }).catch(function (err) {
        console.log(err)
      })
      context.campaigns.sort()
    },
    modifyCampaign: function (item_id) {
      // eslint-disable-next-line standard/object-curly-even-spacing
      if(item_id !== 'new'){
        VueCookies.set('currentCampaign', item_id)
      }
      this.$router.push({ name: 'CampaignCreation', params: { campaign_id: item_id }})
    },
    even: function(arr) {
      // Set slice() to avoid to generate an infinite loop!
      return arr.slice().sort(function (a, b) {
        return a.title - b.title
      })
    }
  },
  created () {
    this.$emit('view','Kampagnenübersicht')
    this.getCampaigns()
  },
  data: function () {
    return {
      campaigns: []
    }
  }
}

</script>

<style scoped>
</style>
