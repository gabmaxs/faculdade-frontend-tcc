<template>
    <ion-grid>
        <ion-row class="ion-align-items-center">
            <ion-col size="10">
                <ion-item>
                    <ion-label position="floating">Ingrediente</ion-label>
                    <ion-input @ionInput="$emit('update:modelValue', $event.target.value)" :value="modelValue"></ion-input>
                </ion-item>
                <ion-row v-if="hasConfig" class="ion-align-items-center">
                    <ion-col size="6">
                        <ion-item>
                            <ion-label position="floating">Quantidade</ion-label>
                            <ion-input type="number" @ionInput="$emit('update:quantity', $event.target.value)" :value="quantity"></ion-input>
                        </ion-item>
                    </ion-col>
                    <ion-col size="6">
                        <ion-item>
                            <ion-label position="floating">Medida</ion-label>
                            <ion-select interface="action-sheet" cancel-text="Cancelar" @ionChange="$emit('update:measure', $event.target.value)" :value="measure">
                              <ion-select-option value="unidade">Unidade</ion-select-option>
                              <ion-select-option value="gramas">Gramas</ion-select-option>
                              <ion-select-option value="xícara">Xícara</ion-select-option>
                              <ion-select-option value="colher de sopa">Colher de sopa</ion-select-option>
                              <ion-select-option value="colher de chá">Colher de chá</ion-select-option>
                            </ion-select>
                        </ion-item>
                    </ion-col>
                </ion-row>
            </ion-col>
            <ion-col size="2">
              <ion-button :disabled="isDisabled" @click="clicked" :color="color"><ion-icon :icon="icon"></ion-icon></ion-button>
            </ion-col>
        </ion-row>
    </ion-grid>
</template>

<script lang="ts">
import { 
  IonInput, IonItem, IonLabel, IonGrid, IonRow, 
  IonCol, IonButton, IonIcon, IonSelect, IonSelectOption
} from '@ionic/vue'
import { addOutline, trashOutline } from 'ionicons/icons';
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'IngredientSearchInput',
  components: { 
    IonInput, IonItem, IonLabel, IonGrid, IonRow, 
    IonCol, IonButton, IonIcon,  IonSelect, IonSelectOption
  },
  emits: ['update:modelValue', 'update:quantity', 'update:measure', 'action'],
  props: {
    modelValue: {
      type: String,
      required: true
    },
    quantity: {
      type: String
    },
    measure: {
      type: String
    },
    hasConfig: {
      type: Boolean,
      default: false
    }
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

    const isDisabled = computed(() => {
      return (
        color.value !== 'danger' &&
        (
          (props.hasConfig && (!props.quantity || props.measure === ''))
          || props.modelValue === '' 
        ))
    })

    return {
      clicked,
      color,
      icon,
      isDisabled
    }
  }
});
</script>