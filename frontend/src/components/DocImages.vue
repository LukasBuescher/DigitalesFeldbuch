<template>
  <div>
    <v-row justify="center">
      <v-card v-for="(item,i) in images" :key="i" class="ma-2">
        <v-card-title>
          <v-text-field v-model="item.title"></v-text-field>
          <v-btn v-on:click="delete_img(item)" icon><v-icon>mdi-delete</v-icon></v-btn>
        </v-card-title>
        <v-card-text class="px-2">
          <v-img :src="item.src" max-height="400" max-width="400" contain></v-img>
        </v-card-text>
      </v-card>
    </v-row>
    <v-btn @click="image_overlay = true" color="secondary" class="mt-2">Bild hochladen</v-btn>
    <v-dialog v-model="image_overlay">
      <v-card>
        <v-card-title> Bild hinzufügen </v-card-title>
        <v-card-text>
          <v-text-field v-model="new_image.title" label="Bezeichnung"></v-text-field>
          <v-text-field v-model="new_image.number" label="Bezeichnung"></v-text-field>
          <v-file-input v-model="input_file" accept="image/*" label="Datei auswählen" show-size></v-file-input>
        </v-card-text>
        <v-card-actions>
          <v-row justify="center">
            <v-btn class="ma-2" v-on:click="convert_img" color="secondary">Bestätigen</v-btn>
            <v-btn class="ma-2" @click="image_overlay = false" color="primary"> Abbrechen</v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
    export default {
        name: "DocImages",
      data: function () {
        return{
          input_file: '',
          new_image: {id: '', title: '', number: '', src: ''},
          image_overlay: false,
          reader: new FileReader()
        }
      },
      props: {
          images: Array
      },
      methods: {
        convert_img: function () {
          this.reader.readAsDataURL(this.input_file)
          this.reader.onload = e => this.images.push({id: new Date().toISOString(), src: this.reader.result, id: this.new_image.number, title: this.new_image.title})
          this.image_overlay = false
        },
        delete_img: function (deleted_image) {
          const index = this.images.indexOf(deleted_image)
          if (index !== -1) {
            this.images.splice(index, 1)
          }
        }
      }
    }
</script>

<style scoped>

</style>
