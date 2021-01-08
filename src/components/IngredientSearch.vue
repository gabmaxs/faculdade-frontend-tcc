<template>
    <ion-grid>
        <ion-row class="ion-align-items-center">
            <ion-col size="10">
                <ion-item>
                    <ion-label position="floating">Ingrediente</ion-label>
                    <ion-input></ion-input>
                </ion-item>
            </ion-col>
            <ion-col size="2">
              <ion-button @click="clicked" :color="color"><ion-icon :icon="icon"></ion-icon></ion-button>
            </ion-col>
        </ion-row>
    </ion-grid>
</template>

<script lang="ts">
import { IonInput, IonItem, IonLabel, IonGrid, IonRow, IonCol, IonButton, IonIcon } from '@ionic/vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IngredientSearch',
  components: { IonInput, IonItem, IonLabel, IonGrid, IonRow, IonCol, IonButton, IonIcon },
  props: {
    color: String,
    icon: String
  },
  setup(props, context) {    
    const clicked = () => {
      const action = props.color === "danger" ? "delete" : "add"
      context.emit("action", action)
    }

    return {
      clicked
    }
  }
});
</script>