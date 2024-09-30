<template>
  <div>
    <div :class="message.img ? `q-pb-md` : ''">{{message.msg_content}}</div>
    <!-- IMAGE EXT -->
    <q-btn v-if="message.img && checkFileExtention(message.img) != 'document'" size="sm" color="primary" @click="handlePreviewFile(message.img)" icon="attach_file">
      Preview
    </q-btn>

    <q-btn v-if="message.img && checkFileExtention(message.img) == 'document'" size="sm" color="primary" @click="handleDownloadFile(message.img)" icon="download">
      Download
    </q-btn>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: ['message', 'api_url', 'documentExt', 'mediaVideoExt', 'mediaAudioExt', 'access_token'],
  data() {
    return {
      previewImage: false,
      previewImgSrc: ''
    }
  },

  methods: {
    checkFileExtention(path){
      let ext = path ? path.split('.').pop() : '';
      if(this.documentExt.includes(ext)){
        return 'document';
      }
      else if(this.mediaVideoExt.includes(ext)){
        return 'video-media';
      }
      else if(this.mediaAudioExt.includes(ext)){
        return 'audio-media';
      }
      else{
        return 'image';
      }
    },

    extractFileName(path){
      const ext = path ? path.split('.').pop() : '';
      const filename = path.split('-')
      filename.shift()
      filename.pop()
      return filename.join('-') + '.' + ext;
    },

    async handlePreviewFile(filename) {
      try {
        let response = await axios.get(`${this.api_url}/api/client/preview/uploads/${filename}`, {
          headers: {
            'Authorization': ' Bearer ' + this.access_token
          },
          responseType: 'blob'
        });

        // Reference for Mozilla
        // let url = URL.createObjectURL(new Blob([response.data]));
        // window.open(url, '_blank');

        const blob = new Blob([response.data], { type: response.data.type });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';  // Open in a new tab
        document.body.appendChild(link);
        link.click();
        // document.body.removeChild(link);
        // URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error fetching the audio file: ', error);
      }
    },

    async handleDownloadFile(filename) {
      try {
        let response = await axios.get(`${this.api_url}/api/client/download/uploads/${filename}`, {
          headers: {
            'Authorization': ' Bearer ' + this.access_token
          },
          responseType: 'blob'
        });

        const blob = new Blob([response.data], { type: response.headers['content-type'] });

        // Create a link to the file
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', filename.split('/').pop()); // Set the file name
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        console.error('Error fetching the audio file: ', error);
      }
    }
  }
}
</script>