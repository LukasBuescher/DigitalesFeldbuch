<template>
  <v-form>
    <v-row no-gutters>
      <v-col>
        <v-combobox v-model="matrix.lies_under" label="Liegt unter" :items="availableStructures" item-text="structurenumber" item-value="_id" multiple class="px-2">
        </v-combobox>
      </v-col>
      <v-col>
        <v-combobox v-model="matrix.lies_on" label="Liegt über" :items="availableStructures" item-text="structurenumber" item-value="_id" multiple class="px-2">
        </v-combobox>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-combobox v-model="matrix.interesects" label="Schneidet" :items="availableStructures" item-text="structurenumber" item-value="_id" multiple class="px-2">
        </v-combobox>
      </v-col>
      <v-col>
        <v-combobox v-model="matrix.intersected_by" label="Wird geschnitten von" :items="availableStructures" item-text="structurenumber" item-value="_id" multiple class="px-2">
        </v-combobox>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-combobox v-model="matrix.equals" label="Ist gleich mit" :items="availableStructures" item-text="structurenumber" item-value="_id" multiple class="px-2">
        </v-combobox>
      </v-col>
      <v-col>
        <v-combobox v-model="matrix.fills" label="Verfüllung von" :items="availableStructures" item-text="structurenumber" item-value="_id" multiple class="px-2">
        </v-combobox>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
    import {structuresdb} from "../adress";

    export default {
      name: "DocMatrix",
      props: {
          matrix: Object
      },
      data: function () {
        return {
          availableStructures: []
        }
      },
      created() {
        this.getStructures()
      },
      methods:{
        getStructures() {
          let context = this
          structuresdb.allDocs({
            include_docs: true,
            attachments: true
          }).then(function (result) {
            for (let item of result.rows) {
              context.availableStructures.push(item.doc)
            }
          })
        }
      }
    }
</script>

<style scoped>

</style>
