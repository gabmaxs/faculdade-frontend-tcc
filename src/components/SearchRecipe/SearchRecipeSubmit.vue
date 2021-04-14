<template>
    <ion-grid>
        <ion-row>
          <ion-col size="8" offset="2">
            <ion-button @click="sendRequest" expand="block">Buscar</ion-button>
          </ion-col>
        </ion-row>
    </ion-grid>
</template>

<script lang="ts">
import { IonGrid, IonRow, IonCol, IonButton } from '@ionic/vue'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'IngredientSearchSubmit',
    components: { IonGrid, IonRow, IonCol, IonButton },
    emits: ["click"],
    setup(_, context) {
        const sendRequest = () => {
            context.emit("click", true)
        }

        return {
            sendRequest
        }
    }
})
</script>