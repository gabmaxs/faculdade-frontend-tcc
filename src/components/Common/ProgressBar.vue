<template>
    <ion-progress-bar type="indeterminate"></ion-progress-bar>
</template>

<script lang="ts">
import { IonProgressBar } from '@ionic/vue'
import { defineComponent } from 'vue'

export default defineComponent({
    name: "ProgressBar",
    components: { IonProgressBar }
})
</script>