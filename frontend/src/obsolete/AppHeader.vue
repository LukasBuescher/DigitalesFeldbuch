<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title> {{this.dynamic_title}} </v-toolbar-title>
  </v-app-bar>
</template>

<script>
  import BackButton from './BackButton.vue'
  import VueCookies from 'vue-cookies'
  import DynamicTitle from "./DynamicTitle";
export default {
  name: 'AppHeader',
  data: function () {
    return {
      dynamic_title: 'Digitales Feldbuch'
    }
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
