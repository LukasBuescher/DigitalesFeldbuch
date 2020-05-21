<template>
  <div>
    <v-data-table :headers="dates_headers" :items="dates" v-model="selected_date" item-key="id" show-select  :single-select="true" hide-default-footer>  </v-data-table>
    <v-btn color="primary" @click="dates_overlay = true"> Hinzufügen </v-btn>
    <v-btn color="secondary" v-on:click="remove_date"> Entfernen </v-btn>
    <v-dialog v-model="dates_overlay" max-width="800" persistent>
      <v-card>
        <v-card-title>Datum hinzufügen </v-card-title>
        <v-card-text>
          <v-date-picker v-model="new_date.date" :show-current="true" :full-width="true"></v-date-picker>
          <v-text-field label="Titel" hint="Geben sie hier einen Titel für das Datum ein" v-model="new_date.title"></v-text-field>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn v-on:click="add_date" color="secondary"> Hinzufügen </v-btn>
          <v-btn color="primary" @click="dates_overlay = false"> Abbrechen </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

</template>

<script>
    export default {
      name: "DocDates",
      data: function () {
        return{
          dates_headers: [
            { text: 'Titel', value: 'title' },
            { text: 'Datum', value: 'date' }
          ],
          selected_date: [],
          new_date: {date_id: '', title: '', date: ''},
          dates_overlay: false
        }
      },
      props: {
        dates: Array
      },
      methods: {
        remove_date: function () {
          const index = this.dates.indexOf(this.selected_date[0])
          if (index !== -1) {
            this.dates.splice(index, 1)
          }
        },
        add_date: function () {
          this.dates_overlay = false
          this.dates.push({id: new Date().toISOString(), title: this.new_date.title, date: this.new_date.date})
        }
      }
    }
</script>

<style scoped>

</style>
