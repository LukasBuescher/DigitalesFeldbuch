<template>
  <div>
    <v-data-table :headers="connected_objects_headers" :items="connected_objects" v-model="selected_connected_object" item-key="id" show-select  :single-select="true" hide-default-footer>  </v-data-table>
    <v-btn v-on:click="add_connected_object" color="secondary"> Hinzufügen</v-btn>
    <v-btn v-on:click="remove_connected_object" color="primary"> Entfernen </v-btn>
    <v-btn v-on:click="edit_connected_object" color="secondary"> Bearbeiten </v-btn>
    <v-dialog v-model="connected_objects_overlay">
      <v-card>
        <v-card-title> Verbindungen bearbeiten </v-card-title>
        <v-card-text>
          <v-text-field v-model="new_connected_object.connection_type" label="Verbindungsart"> </v-text-field>
          <v-select v-model="new_connected_object.connected_object" item-value="_id" item-text="findnumber" :items="availableFinds" label="Funde"></v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn v-on:click="confirm_connected_object" color="secondary">Bestätigen</v-btn>
          <v-btn @click="connected_objects_overlay = false" color="primary">Abbrechen</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import { findsdb } from '../adress.js'
    export default {
      name: "DocConnectedObjects",
      created() {
        this.getfinds()
      },
      data: function () {
        return{
          connected_objects_headers: [
            {text: 'Verbindungsart', value: 'connection_type'},
            {text: 'Verbundenes Objekt', value: 'connected_object'}
          ],
          selected_connected_object: [],
          new_connected_object: {connection_type: '', connected_object: ''},
          connected_objects_overlay: false,
          availableFinds: []
        }
      },
      props: {
        connected_objects: Array
      },
      methods: {
        edit_connected_object: function () {
          this.new_connected_object = {
            id: this.selected_connected_object[0].id,
            connection_type: this.selected_connected_object[0].connection_type,
            connected_object: this.selected_connected_object[0].connected_object,
            edit: true
          }
          this.connected_objects_overlay = true
        },
        confirm_connected_object: function () {
          if (this.new_connected_object.edit) {
            this.remove_connected_object()
            this.selected_connected_object = []
          }
          this.connected_objects.push(this.new_connected_object)
          this.connected_objects_overlay = false
        },
        remove_connected_object: function () {
          const index = this.connected_objects.indexOf(this.selected_connected_object[0])
          if (index !== -1) {
            this.connected_objects.splice(index, 1)
          }
        },
        add_connected_object: function () {
          this.connected_objects_overlay = {
            id: new Date().toISOString(),
            connection_type: '',
            connected_object: '',
            edit: false}
          this.connected_objects_overlay = true
        },
        getfinds: function () {
          let context = this
          findsdb.allDocs({
            include_docs: true,
            attachments: true
          }).then(function (result) {
            for (let item of result.rows) {
              console.log('context: ' + context.$route.params.excavation_id)
              console.log('item: ' + item.excavation_id)
              if (item.excavation_id === context.$route.params.excavation_id)
                context.availableFinds.push(item.doc)
            }
          }).catch(function (err) {
            console.log(err)
          })
        }
      }
    }
</script>

<style scoped>

</style>
