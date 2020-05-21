<template>
    <div>
      <a href="url" target="_blank">Download</a>
    </div>
</template>

<script>
    export default {
      name: "PdfComponent",
      data: function () {
        return {
          url: '',
          blob: ''
        }
      },
      created() {
        this.createpdf()
      },
      methods:{
        createpdf () {
          let context = this
          const PDFDocument = require('pdfkit')
          const blobStream  = require('blob-stream')
          const doc = new PDFDocument
          const stream = doc.pipe(blobStream())
          doc.text('Hello world!')
          doc.end()
          stream.on('finish', function() {
            context.blob = stream.toBlob('application/pdf')
            context.url = stream.toBlobURL('application/pdf')
          })
        }
      }

    }
</script>

<style scoped>

</style>
