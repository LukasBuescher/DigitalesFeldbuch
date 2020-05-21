<template>
  <div>
      <v-list>
        <template v-for="(sample, i) in samples" >
          <v-list-item :key="i" v-on:click="modifysample(sample._id)">
            <v-list-item-content>
              <v-list-item-title> {{sample.samplenumber}} </v-list-item-title>
              <v-list-item-subtitle> {{sample.description}} </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider v-if="i !== samples.length - 1"></v-divider>
        </template>
      </v-list>
      <v-btn v-on:click="modifysample('new')" color="primary"> Probe hinzufügen</v-btn>
  </div>
</template>

<script>
import VueCookies from "vue-cookies";

export default {
  name: 'samplesOverview',
  methods: {
    modifysample: function (item_id) {
      VueCookies.set('excavationTab', 4)
      this.$router.push({ name: 'SampleCreation', params: { excavation_id: this.$route.params.excavation_id, sample_id: item_id }})
    }
  },
  props: {
    samples: Array
  }
}

</script>

<style scoped>
</style>
