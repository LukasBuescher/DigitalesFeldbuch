<template>
  <div>
    <v-data-table :headers="colors_headers" :items="colors" v-model="selected_color" item-key="id" show-select  :single-select="true" hide-default-footer>  </v-data-table>
    <v-btn v-on:click="add_color" color="secondary"> Hinzufügen</v-btn>
    <v-btn v-on:click="remove_color" color="primary"> Entfernen </v-btn>
    <v-btn v-on:click="edit_color" color="secondary"> Bearbeiten </v-btn>

    <v-dialog v-model="colors_overlay">
      <v-card>
        <v-card-title> Farben bearbeiten</v-card-title>
        <v-card-text>
          <v-text-field v-model="new_color.title" label="Bezeichnung"> </v-text-field>
          <v-text-field v-model="new_color.hvc_hue" label="Hue"></v-text-field>
          <v-text-field v-model="new_color.hvc_value" label="Value"></v-text-field>
          <v-text-field v-model="new_color.hvc_chroma" label="Chroma"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn v-on:click="confirm_color" color="secondary">Bestätigen</v-btn>
          <v-btn @click="colors_overlay = false" color="primary">Abbrechen</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
    export default {
      name: "DocColors",
      data: function () {
        return {
          colors_headers: [
            {text: 'Bezeichnung', value: 'title'},
            {text: 'Hue', value: 'hvc_hue'},
            {text: 'Value', value: 'hvc_value'},
            {text: 'Chroma', value: 'hvc_chroma'}
          ],
          selected_color: [],
          new_color: {title: '', hvc_hue: '', hvc_value: '', hvc_chroma: ''},
          colors_overlay: false
        }
      },
      props: {
        colors: Array
      },
      methods: {
        add_color: function () {
          this.new_color = {
            id: new Date().toISOString(),
            title: '',
            hvc_hue: '',
            hvc_value: '',
            hvc_chroma: '',
            edit: false
          }
          this.colors_overlay = true
        },
        edit_color: function () {
          this.new_color = {
            id: this.selected_color[0].id,
            title: this.selected_color[0].title,
            hvc_hue: this.selected_color[0].hvc_hue,
            hvc_value: this.selected_color[0].hvc_value,
            hvc_chroma: this.selected_color[0].hvc_chroma,
            edit: true
          }
          this.colors_overlay = true
        },
        confirm_color: function () {
          if (this.new_color.edit) {
            this.remove_color()
            this.selected_color = []
          }
          this.colors.push(this.new_color)
          this.colors_overlay = false
        },
        remove_color: function () {
          const index = this.colors.indexOf(this.selected_color[0])
          if (index !== -1) {
            this.colors.splice(index, 1)
          }
        },
      }
    }
</script>

<style scoped>

</style>
