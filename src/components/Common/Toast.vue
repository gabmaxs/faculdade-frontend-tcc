<template>
    <div>
        <ion-toast
            :is-open="show"
            :message="message"
            :duration="1200"
            @onDidDismiss="handleDismiss"
        >
  </ion-toast>

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonToast } from '@ionic/vue';
export default defineComponent({
    name: "Toast",
    props: [
        "message", "show"
    ],
    emits: [
        "dismiss"
    ],
    components: { IonToast },
    setup(_, context) {
        const handleDismiss = () => context.emit("dismiss")

        return {
            handleDismiss
        }
    }
})
</script>