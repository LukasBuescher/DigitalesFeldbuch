<template>
  <div>
    <v-data-table :headers="measuring_point_headers" :items="measuring_points" v-model="selected_measuring_point" item-key="id" show-select  :single-select="true" hide-default-footer>  </v-data-table>
    <v-btn v-on:click="add_measuring_point" color="secondary"> Hinzufügen</v-btn>
    <v-btn v-on:click="remove_measuring_point" color="primary"> Entfernen </v-btn>
    <v-btn v-on:click="edit_measuring_point" color="secondary"> Bearbeiten </v-btn>
    <v-dialog v-model="measuring_point_overlay" persistent max-width="800">
      <v-card>
        <v-card-title>Messpunkte bearbeiten </v-card-title>
        <v-card-text>
          <v-col>
            <v-text-field v-model="new_measuring_point.tachymeter_id" label="Tachymeter ID"></v-text-field>
            <v-text-field v-model="new_measuring_point.title" label="Kommentar"></v-text-field>
          </v-col>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn color="secondary" v-on:click="confirm_measuring_point"  class="mb-4">Bestätigen</v-btn>
          <v-btn color="primary" @click="measuring_point_overlay = false" class="mb-4"> Abbrechen </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
    export default {
      name: "DocMeasurings",
      data: function () {
        return{
          measuring_point_headers: [
            { text: 'Tachymeterid', value: 'tachymeter_id' },
            { text: 'Kommentar', value: 'title' },
            { text: 'Koordinaten', value: 'x' },
            { text: '', value: 'y' },
            { text: '', value: 'z' }
          ],
          selected_measuring_point: [],
          new_measuring_point: {tachymeter_id: '', title: '', x: '', y: '', z: ''},
          measuring_point_overlay: false
        }
      },
      props: {
        measuring_points: Array
      },
      methods: {
        add_measuring_point: function () {
          this.new_measuring_point = {id: new Date().toISOString(), tachymeter_id: '', title: '', x: '', y: '', z: '', edit: false}
          this.measuring_point_overlay = true
        },
        edit_measuring_point: function () {
          this.new_measuring_point = {
            id: this.selected_measuring_point[0].id,
            tachymeter_id: this.selected_measuring_point[0].tachymeter_id,
            title: this.selected_measuring_point[0].title,
            easting: this.selected_measuring_point[0].easting,
            northing: this.selected_measuring_point[0].northing,
            height: this.selected_measuring_point[0].height,
            edit: true
          }
          this.measuring_point_overlay = true
        },
        confirm_measuring_point: function () {
          if (this.new_measuring_point.edit) {
            this.remove_measuring_point()
            this.selected_measuring_point = []
          }
          this.measuring_points.push(this.new_measuring_point)
          this.measuring_point_overlay = false
        },
        remove_measuring_point: function () {
          const index = this.measuring_points.indexOf(this.selected_measuring_point[0])
          if (index !== -1) {
            this.measuring_points.splice(index, 1)
          }
        }
      }
    }
</script>

<style scoped>

</style>
