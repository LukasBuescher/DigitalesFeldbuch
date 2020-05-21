<template>
    <div>
      <v-data-table :headers="inclusions_headers" :items="inclusions" v-model="selected_inclusion" item-key="id" show-select :dense="true" :single-select="true" hide-default-footer>  </v-data-table>
      <v-btn v-on:click="add_inclusion" color="secondary"> Hinzufügen</v-btn>
      <v-btn v-on:click="remove_inclusion" color="primary"> Entfernen </v-btn>
      <v-btn v-on:click="edit_inclusion" color="secondary"> Bearbeiten </v-btn>
      <v-dialog v-model="inclusions_overlay" max-width="800" persistent>
        <v-card>
          <v-card-title>Einschlüsse Bearbeiten </v-card-title>
          <v-card-text>
            <v-text-field v-model="new_inclusion.name" label="Material"></v-text-field>
            <v-text-field v-model="new_inclusion.percentage" label="Prozentsatz"></v-text-field>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn v-on:click="confirm_inclusion">Bestätigen</v-btn>
            <v-btn @click="inclucions_overlay = false">Abbrechen</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
</template>

<script>
    export default {
      name: "DocInclusions",
      data: function () {
        return {
          inclusions_headers: [
            { text: 'Material', value: 'name' },
            { text: 'Prozentsatz', value: 'percentage' },
          ],
          selected_inclusion: [],
          new_inclusion: {id: '', name: '', percentage: ''},
          inclusions_overlay: false
        }
      },
      props:{
          inclusions: Array
      },
      methods: {
        add_inclusion: function () {
          this.new_inclusion = {
            id: new Date().toISOString(),
            name: '',
            percentage: '',
            edit: false}
          this.inclusions_overlay = true
        },
        edit_inclusion: function () {
          this.new_inclusion = {
            id: this.selected_inclusion[0].id,
            name: this.selected_inclusion[0].name,
            percentage: this.selected_inclusion[0].percentage,
            edit: true
          }
          this.inclusions_overlay = true
        },
        confirm_inclusion: function () {
          if (this.new_inclusion.edit) {
            this.remove_inclusion()
            this.selected_inclusion = []
          }
          this.inclusions.push(this.new_inclusion)
          this.inclusions_overlay = false
        },
        remove_inclusion: function () {
          const index = this.inclusions.indexOf(this.selected_inclusion[0])
          if (index !== -1) {
            this.inclusions.splice(index, 1)
          }
        }

      }
    }
</script>

<style scoped>

</style>
