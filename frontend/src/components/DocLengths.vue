<template>
  <div>
    <v-data-table :headers="lengths_headers" :items="lengths" v-model="selected_length" item-key="id" show-select  :single-select="true" hide-default-footer>  </v-data-table>
    <v-btn v-on:click="add_length" color="secondary"> Hinzufügen</v-btn>
    <v-btn v-on:click="remove_length" color="primary"> Entfernen </v-btn>
    <v-btn v-on:click="edit_length" color="secondary"> Bearbeiten </v-btn>

    <v-dialog v-model="lengths_overlay">
      <v-card>
        <v-card-title> Abmessungen bearbeiten</v-card-title>
        <v-card-text>
          <v-text-field v-model="new_length.title" label="Bezeichnung"> </v-text-field>
          <v-text-field v-model="new_length.accuracy" label="Genauigkeit"></v-text-field>
          <v-text-field v-model="new_length.from" label="Von"></v-text-field>
          <v-text-field v-model="new_length.to" label="Bis"></v-text-field>
          <v-select v-model="new_length.unit" :items="['mm','cm','m']" label="Einheit"></v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn v-on:click="confirm_length">Bestätigen</v-btn>
          <v-btn @click="lengths_overlay = false">Abbrechen</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
    export default {
      name: "DocLengths",
      props: {
          lengths: Array
      },
      data: function () {
        return {
          lengths_headers: [
            {text: 'Bezeichnung', value: 'title'},
            {text: 'Genauigkeit', value: 'accuracy'},
            {text: 'Von', value: 'from'},
            {text: 'Bis', value: 'to'},
            {text: 'Einheit', value: 'unit'}
          ],
          selected_length: [],
          new_length: {title: '', accuracy: '', from: '', to: '', unit: ''},
          lengths_overlay: false,
        }
      },
      methods: {
        add_length: function () {
          this.new_length = {id: new Date().toISOString(), title: '', accuracy: '', from: '', to: '', unit: '', edit: false}
          this.lengths_overlay = true
        },
        edit_length: function () {
          this.new_length = {
            id: this.selected_length[0].id,
            title: this.selected_length[0].title,
            accuracy: this.selected_length[0].accuracy,
            from: this.selected_length[0].from,
            to: this.selected_length[0].to,
            unit: this.selected_length[0].unit,
            edit: true
          }
          this.lengths_overlay = true
        },
        confirm_length: function () {
          if (this.new_length.edit) {
            this.remove_length()
            this.selected_length = []
          }
          this.lengths.push(this.new_length)
          this.lengths_overlay = false
        },
        remove_length: function () {
          const index = this.lengths.indexOf(this.selected_length[0])
          if (index !== -1) {
            this.lengths.splice(index, 1)
          }
        }

      }
    }
</script>

<style scoped>

</style>
