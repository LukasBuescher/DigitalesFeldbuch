<template>
  <div>
    <h1>Schnitt bearbeiten</h1>
    <v-app>
        <v-container>
        <v-text-field v-model="title" label="Schnittname" hint="  Geben Sie die Bezeichnung des Schnitts ein"></v-text-field>
        <v-row>
          <v-col>
            <v-text-field label="Anlegungsdatum" hint="Geben sie hier das Datum ein, an dem der Schnitt angelegt wurde" v-model="excavated_date"></v-text-field>
            <v-btn v-on:click="change_excavated_date" color="secondary"> Datum wählen </v-btn>
            <v-text-field label="Eintragungsdatum" hint="Geben sie hier das Datum ein, an dem der Schnitt in das Feldbuch eingetragen wurde" v-model="date"></v-text-field>
            <v-btn v-on:click="change_date" color="secondary"> Datum wählen </v-btn>
          </v-col>
          <v-col><v-date-picker v-model="selected_date" :show-current="true" :full-width="true"></v-date-picker></v-col>
        </v-row>
        <v-text-field v-model="leader" label="Schnittleiter" hint="Tragen Sie hier den Leiter des Schnitts ein"></v-text-field>
        <v-text-field v-model="startNiveau" label="Startniveau" hint="Geben Sie hier das Startniveau des Schnitts an"></v-text-field>
        <v-text-field v-model="endNiveau" label="Endniveau" hint="Geben Sie hier das Endniveau des Schnitts an"></v-text-field>
        <!--v-file-input id="input_image" v-model="section_image" accept="image/*" multiple label="Bild anhängen" prepend-icon="mdi-camera" ></v-file-input-->
        <v-btn v-on:click="logForm" color="secondary" >Speichern</v-btn>
        <v-btn v-on:click="goBack" color="primary">Abbrechen</v-btn>
        </v-container>
        <!--v-btn v-on:click="addimage" color="primary">Hinzufügen</v-btn-->
    </v-app>
  </div>
</template>

<script>
import VueCookies from 'vue-cookies'
import {path} from '../adress.js'

var PouchDB = require('pouchdb-browser').default // doesn'T work without '.default' despite documentation, solution found in some github issuetracker
var sectiondb = new PouchDB('sections_database') // creates new database or opens existing var db = new PouchDB('sections_database') // creates new database or opens existing one
var sectionremoteDB = new PouchDB(path + '/sections')
var imagedb = new PouchDB('imagedb')


sectiondb.sync(sectionremoteDB, {
  live: true,
  retry: true
}).on('change', function (change) {
  // yo, something changed!
}).on('paused', function (info) {
  // replication was paused, usually because of a lost connection
}).on('active', function (info) {
  // replication was resumed
// eslint-disable-next-line handle-callback-err
}).on('error', function (err) {
  // totally unhandled error (shouldn't happen)
  console.log(err)
})

let context
export default {
  name: 'SectionModification',
  data: function () {
    return {
      section_image: [],
      title: '',
      leader: '',
      date: '',
      excavated_date: '',
      selected_date: '',
      startNiveau: '',
      endNiveau: '',
      // eslint-disable-next-line vue/no-reserved-keys
      _id: 0,
      // eslint-disable-next-line vue/no-reserved-keys
      _rev: 0,
    }
  },
  created () { // This entire code block is a very ugly but working solution to get the database data conceirning titles and descriptions into the ionic-input fields. They are not supporting according vue methods for some reason
    context = this
    context._id = VueCookies.get('currentSection')._id
    sectiondb.get(context._id).then(function (result) {
      context.title = result.title
      context.leader = result.leader
      context.date = result.date
      context.startNiveau = result.startNiveau
      context.endNiveau = result.endNiveau
      context._rev = result._rev
    })
    this.title = context.title
    this.leader = context.leader
    this.date = context.date
    this.startNiveau = context.startNiveau
    this.endNiveau = context.endNiveau
    this._rev = context._rev
  },
  methods: {
    logForm: function () {
      let router = this.$router // the corre'form'is' is not reachable inside the dp.put call back, so it gets put into a variable.
      // eslint-disable-next-line standard/object-curly-even-spacing
      let section = {
        _id: context._id,
        title: context.title,
        leader: context.leader,
        date: context.date,
        startNiveau: context.startNiveau,
        endNiveau: context.endNiveau,
        _rev: context._rev,
        excavationId: VueCookies.get('currentExcavation')._id,
      }
      sectiondb.put(section, function callback (err, result) {
        if (!err) {
          console.log('Successfully changed a section! ')
          // eslint-disable-next-line standard/object-curly-even-spacing
          // router.push({ name: 'CampaignsOverview'})
          router.go(-1) // dynamic and fun
        } else {
          console.log(err)
        }
      })
    },
    change_excavated_date: function () {
      this.excavated_date = this.selected_date
    },
    change_date: function () {
      this.date = this.selected_date
    },
    addimage: function () {
      context = this
      imagedb.put({
        _id: new Date(),
        object: VueCookies.get('currentSection').id,
        _attachments: {
          filename: {
            type: context.section_image.type,
            data: context.section_image
          }
        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    goBack: function () {
      // eslint-disable-next-line standard/object-curly-even-spacing
      // this.$router.push({ name: 'CampaignsOverview'}) // commented out because its static
      this.$router.go(-1) // dynamic and fun
    }
  }
}
</script>

<style scoped>

</style>
