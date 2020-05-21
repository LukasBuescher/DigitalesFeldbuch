<template>
  <div>
      <v-list>
        <template v-for="(find, i) in finds" >
          <v-list-item :key="i" v-on:click="modifyFind(find._id)">
            <v-list-item-content>
              <v-list-item-title> {{find.findnumber}} </v-list-item-title>
              <v-list-item-subtitle> {{find.description}} </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider v-if="i !== finds.length - 1"></v-divider>
        </template>
      </v-list>
      <v-btn v-on:click="modifyFind('new')" color="primary">Fund hinzufügen</v-btn>
  </div>
</template>

<script>
import VueCookies from "vue-cookies";

export default {
  name: 'FindsOverview',
  methods: {
    modifyFind: function (item_id) {
      VueCookies.set('excavationTab', 3)
      this.$router.push({ name: 'FindCreation',  params: { excavation_id: this.$route.params.excavation_id, find_id: item_id }})
    }
  },
  props:{
    finds: Array
  },
}

</script>

<style scoped>
</style>
