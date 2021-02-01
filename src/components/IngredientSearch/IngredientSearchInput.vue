<template>
    <ion-grid>
        <ion-row class="ion-align-items-center">
            <ion-col size="10">
                <ion-item>
                    <ion-label position="floating">Ingrediente</ion-label>
                    <ion-input @ionInput="$emit('update:modelValue', $event.target.value)" :value="modelValue"></ion-input>
                </ion-item>
            </ion-col>
            <ion-col size="2">
              <ion-button :disabled="modelValue === '' && color !== 'danger'" @click="clicked" :color="color"><ion-icon :icon="icon"></ion-icon></ion-button>
            </ion-col>
        </ion-row>
    </ion-grid>
</template>

<script lang="ts">
import { IonInput, IonItem, IonLabel, IonGrid, IonRow, IonCol, IonButton, IonIcon } from '@ionic/vue'
import { addOutline, trashOutline } from 'ionicons/icons';
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'IngredientSearchInput',
  components: { IonInput, IonItem, IonLabel, IonGrid, IonRow, IonCol, IonButton, IonIcon },
  emits: ['update:modelValue', 'action'],
  props: {
    modelValue: String
  },
  setup(props, context) { 
    const color = ref("primary")
    const icon = ref(addOutline)

    const clicked = () => {
      let action = "delete"
      if(color.value !== "danger") {
        action = "add"
        color.value = "danger"
        icon.value = trashOutline
      }
      context.emit("action", action)
    }

    return {
      clicked,
      color,
      icon
    }
  }
});
</script>