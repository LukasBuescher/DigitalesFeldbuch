<template>
  <div>
    <v-data-table :headers="key_value_headers" :items="key_values" v-model="selected_key_value" item-key="id" show-select  :single-select="true" hide-default-footer>  </v-data-table>
    <v-btn v-on:click="add_key_value" color="secondary"> Hinzufügen</v-btn>
    <v-btn v-on:click="remove_key_value" color="primary"> Entfernen </v-btn>
    <v-btn v-on:click="edit_key_value" color="secondary"> Bearbeiten </v-btn>

    <v-dialog v-model="key_value_overlay">
      <v-card>
        <v-card-title> Zusatzattribute bearbeiten </v-card-title>
        <v-card-text>
          <v-text-field v-model="new_key_value.key" label="Attributname"></v-text-field>
          <v-text-field v-model="new_key_value.value" label="Wert"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn v-on:click="confirm_key_value">Bestätigen</v-btn>
          <v-btn @click="key_value_overlay = false">Abbrechen</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
    export default {
      name: "DocKeyValues",
      data: function () {
        return{
          key_value_headers: [
            { text: 'Attributname', value: 'key' },
            { text: 'Wert', value: 'value' }
          ],
          selected_key_value: [],
          new_key_value: {id: '', key: '', value: '', edit: false},
          key_value_overlay: false,
        }
      },
      props: {
        key_values: Array
      },
      methods: {
        add_key_value: function () {
          this.new_key_value = {id: new Date().toISOString(), key: '', value: '', edit: false}
          this.key_value_overlay = true
        },
        edit_key_value: function () {
          this.new_key_value = {id: this.selected_key_value[0].id, key: this.selected_key_value[0].key, value: this.selected_key_value[0].value, edit: true}
          this.key_value_overlay = true
        },
        confirm_key_value: function () {
          if (this.new_key_value.edit) {
            this.remove_key_value()
            this.selected_key_value = []
          }
          this.key_values.push(this.new_key_value)
          this.key_value_overlay = false
        },
        remove_key_value: function () {
          const index = this.key_values.indexOf(this.selected_key_value[0])
          if (index !== -1) {
            this.key_values.splice(index, 1)
          }
        }
      }
    }
</script>

<style scoped>

</style>
