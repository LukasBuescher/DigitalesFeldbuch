<template>
    <div>
      <v-file-input v-model="input_file" accept=".txt" label="Tachymeterdaten" show-size></v-file-input>
      <v-btn v-on:click="import_file()" color="primary"> Daten importieren</v-btn>
      <!--a href="url" target="_blank">Download</a-->

    </div>
</template>

<script>
  import {excavationsdb, findsdb, samplesdb, sectionsdb, structuresdb} from "../adress";
  import VueCookies from "vue-cookies";


    export default {
      name: "PdfComponent",
      data: function () {
        return {
          url: '',
          blob: '',
          input_file: '',
          input_text: ''
        }
      },
      methods:{
        import_file: function() {
          let reader = new FileReader()
          let context = this
          reader.readAsText(this.input_file)
          reader.onload = e => {
            let input_text = e.target.result
            let points = input_text.split('\r\n')
            points.forEach(function (item) {
              let point = item.split('\t')
              findsdb.allDocs({
                include_docs: true,
                attachments: true
              }).then(function (result) {
                for (let item of result.rows) {
                  if (item.doc.excavation_id === context.$route.params.excavation_id && item.doc.measuring_points.length > 0) {
                    item.doc.measuring_points.forEach(function (measuring_point) {
                      console.log(measuring_point.tachymeter_id)
                      console.log(point[0])
                      if(measuring_point.tachymeter_id === point[0]){
                        measuring_point.x = point[1]
                        measuring_point.y = point[2]
                        measuring_point.z = point[3]
                        findsdb.put(item.doc)
                      }
                    })
                  }
                }
              }).catch(function (err) {
                console.log(err)
              })
              samplesdb.allDocs({
                include_docs: true,
                attachments: true
              }).then(function (result) {
                for (let item of result.rows) {
                  if (item.doc.excavation_id === context.$route.params.excavation_id && item.doc.measuring_points.length > 0) {
                    item.doc.measuring_points.forEach(function (measuring_point) {
                      console.log(measuring_point.tachymeter_id)
                      console.log(point[0])
                      if(measuring_point.tachymeter_id === point[0]){
                        measuring_point.x = point[1]
                        measuring_point.y = point[2]
                        measuring_point.z = point[3]
                        samplesdb.put(item.doc)
                      }
                    })
                  }
                }
              }).catch(function (err) {
                console.log(err)
              })
              structuresdb.allDocs({
                include_docs: true,
                attachments: true
              }).then(function (result) {
                for (let item of result.rows) {
                  if (item.doc.excavation_id === context.$route.params.excavation_id && item.doc.measuring_points.length > 0) {
                    item.doc.measuring_points.forEach(function (measuring_point) {
                      console.log(measuring_point.tachymeter_id)
                      console.log(point[0])
                      if(measuring_point.tachymeter_id === point[0]){
                        measuring_point.x = point[1]
                        measuring_point.y = point[2]
                        measuring_point.z = point[3]
                        structuresdb.put(item.doc)
                      }
                    })
                  }
                }
              }).catch(function (err) {
                console.log(err)
              })
              sectionsdb.allDocs({
                include_docs: true,
                attachments: true
              }).then(function (result) {
                for (let item of result.rows) {
                  if (item.doc.excavation_id === context.$route.params.excavation_id && item.doc.measuring_points.length > 0) {
                    item.doc.measuring_points.forEach(function (measuring_point) {
                      console.log(measuring_point.tachymeter_id)
                      console.log(point[0])
                      if(measuring_point.tachymeter_id === point[0]){
                        measuring_point.x = point[1]
                        measuring_point.y = point[2]
                        measuring_point.z = point[3]
                        sectionsdb.put(item.doc)
                      }
                    })
                  }
                }
              }).catch(function (err) {
                console.log(err)
              })
            })
          }
        }
      }

    }
</script>

<style scoped>

</style>
