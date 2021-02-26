<template>
    <div>
        <ion-alert
            :is-open="true"
            :header="header"
            :message="message"
            :buttons="buttons"
            @onDidDismiss="handleDismiss"
        >
        </ion-alert>
    </div>
</template>

<script lang="ts">
import { IonAlert } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: "Alert",
    components: { IonAlert },
    props: {
        message: {
            type: String,
            required: true
        },
        header: {
            type: String,
            default: "Aviso"
        }
    },
    emit: ["dismiss"],
    setup(props,context) {
        const handleDismiss = () => context.emit("dismiss", true)
        const buttons = ['Ok']

        return { buttons, handleDismiss }
    }
})
</script>