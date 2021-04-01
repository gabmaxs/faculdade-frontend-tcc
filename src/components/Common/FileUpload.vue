<template>
    <div>
        <file-pond ref="pond" allow-multiple="false" @processfiles="handleFile" accepted-file-types="image/jpeg, image/png" name="image" :server="filePondURL" />
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

// Import Vue FilePond
import vueFilePond from "vue-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
// Import FilePond plugins
// Please note that you need to install these plugins separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation filepond-plugin-file-validate-type --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { API_URL } from '@/API_URL';
// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImageExifOrientation
);


export default defineComponent({
    name: "FileUpload",
    props: ['server'],
    emits: ["fileUploadComplete"],
    components: {
        FilePond
    },
    setup(props, context) {
        const filePondURL = `${API_URL}/${props.server}`
        const pond = ref(null)
        const handleFile = () => context.emit("fileUploadComplete", pond.value.getFile().serverId)

        return {
            handleFile,
            filePondURL,
            pond
        }
    },
})
</script>
