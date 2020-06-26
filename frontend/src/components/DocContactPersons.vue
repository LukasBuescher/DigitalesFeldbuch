<template>
  <div>
    <v-data-table :headers="persons_headers" :items="persons" v-model="selected_person" item-key="id" show-select :single-select="true" hide-default-footer>  </v-data-table>
    <v-btn v-on:click="add_person" color="secondary"> Hinzufügen</v-btn>
    <v-btn v-on:click="remove_person" color="primary"> Entfernen </v-btn>
    <v-btn v-on:click="edit_person" color="secondary"> Bearbeiten </v-btn>
    <v-dialog v-model="persons_overlay">
      <v-card>
        <v-card-title> Personen bearbeiten</v-card-title>
        <v-card-text>
          <v-text-field v-model="new_person.name" label="Name"> </v-text-field>
          <v-text-field v-model="new_person.purpose" label="Rolle"></v-text-field>
          <v-text-field v-model="new_person.email"  label="Email"></v-text-field>
          <v-text-field v-model="new_person.phone" label="Telefonnummer"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn v-on:click="confirm_person" color="secondary">Bestätigen</v-btn>
          <v-btn @click="persons_overlay = false" color="primary">Abbrechen</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
    export default {
      name: "ContactPersons",
      data: function () {
        return{
          persons_headers: [
            {text: 'Name', value: 'name'},
            {text: 'Rolle', value: 'purpose'},
            {text: 'E-Mail Adresse', value: 'email'},
            {text: 'Telefonnummer', value: 'phone'}
          ],
          selected_person: [],
          new_person: {name: '', purpose: '', email: '', phone: ''},
          persons_overlay: false
        }
      },
      props: {
          persons: Array
      },
      methods: {
        add_person: function () {
          this.new_person = {id: new Date().toISOString(), name: '', purpose: '', email: '', phone: '', edit: false},
            this.persons_overlay = true
        },
        edit_person: function () {
          this.new_person = {
            id: this.selected_person[0].id,
            name: this.selected_person[0].name,
            purpose: this.selected_person[0].purpose,
            email: this.selected_person[0].email,
            phone: this.selected_person[0].phone,
            edit: true
          }
          this.persons_overlay = true
        },
        confirm_person: function () {
          if (this.new_person.edit) {
            this.remove_person()
            this.selected_person = []
          }
          this.persons.push(this.new_person)
          this.persons_overlay = false
        },
        remove_person: function () {
          const index = this.persons.indexOf(this.selected_person[0])
          if (index !== -1) {
            this.persons.splice(index, 1)
          }
        }
      }
    }
</script>

<style scoped>

</style>
