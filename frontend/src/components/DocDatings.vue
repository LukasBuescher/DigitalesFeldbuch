<template>
  <div>
    <v-text-field v-model="dating.accuracy" label="Genauigkeit"></v-text-field>
    <v-select v-model="dating.dating_rough_from" :items="rough_eras" label="Grobdatierung Von"></v-select>
    <v-select v-model="dating.dating_rough_to" :items="rough_eras" label="Grobdatierung Bis"></v-select>
    <v-text-field v-model="dating.dating_fine_from" label="Feindatierung Von"></v-text-field>
    <v-select v-model="dating.dating_fine_from_era" :items="eras" label="Era"></v-select>
    <v-text-field v-model="dating.dating_fine_to" label="Feindatierung Bis"></v-text-field>
    <v-select v-model="dating.dating_fine_to_era" :items="eras" label="Era"></v-select>
  </div>
</template>

<script>
    export default {
      name: "DocDatings",
      data: function () {
        return{
          eras: [
            'v. Chr.',
            'n. Chr.'
          ],
          rough_eras: [
            'Unbekannt',
            'Erdgeschichte',
            'Vorgeschichte',
            'Steinzeit',
            'Paläolithikum',
            'Mesolithikum',
            'Neolithikum',
            'Metallzeit',
            'Bronzezeit',
            'Eisenzeit',
            'Frühgeschichte',
            'Latènezeit',
            'Frühe Kaiserzeit (ca. 0 - 70 AD)',
            'mittlere Kaiserzeit (ca. 70 - 280 AD)',
            'Spätantike (ca. 280 - 500 AD)',
            'Römisch (ca. 0 - 500 AD)',
            'Frühmittelalter/Völkerwanderungszeit',
            'Mittelalter',
            'Neuzeit',
            'Modern'
          ]
        }
      },
      props: {
        dating: Object
      },
      methods: {

      }
    }
</script>

<style scoped>

</style>
