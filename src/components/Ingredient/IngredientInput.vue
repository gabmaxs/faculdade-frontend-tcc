<template>
    <ion-grid>
        <ion-row class="ion-align-items-center">
            <ion-col size="10">
                <div class="item-padding">
                  <ion-item>
                    <ion-label position="floating">Ingrediente</ion-label>
                    <ion-input @ionInput="$emit('update:modelValue', $event.target.value)" :value="modelValue"></ion-input>
                  </ion-item>
                </div>
                <ion-row v-if="hasConfig" class="ion-align-items-center">
                    <ion-col size="6">
                        <ion-item>
                            <ion-label position="floating">Quantidade</ion-label>
                            <ion-input type="number" step="0.05" @ionInput="$emit('update:quantity', $event.target.value)" :value="quantity"></ion-input>
                        </ion-item>
                    </ion-col>
                    <ion-col size="6">
                        <ion-item>
                            <ion-label position="floating">Medida</ion-label>
                            <ion-select interface="action-sheet" cancel-text="Cancelar" @ionChange="$emit('update:measure', $event.target.value)" :value="measure">
                              <ion-select-option v-for="measure in measures" :key="measure" :value="measure">{{ measure.charAt(0).toUpperCase() + measure.slice(1) }}</ion-select-option>
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
import { recipeService } from '@/services';
import { 
  IonInput, IonItem, IonLabel, IonGrid, IonRow, 
  IonCol, IonButton, IonIcon, IonSelect, IonSelectOption
} from '@ionic/vue'
import { addOutline, trashOutline } from 'ionicons/icons';
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'IngredientInput',
  components: { 
    IonInput, IonItem, IonLabel, IonGrid, IonRow, 
    IonCol, IonButton, IonIcon,  IonSelect, IonSelectOption
  },
  emits: ['update:modelValue', 'update:quantity', 'update:measure', "update:dirty", 'action'],
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
    },
    dirty: {
      type: Boolean,
      defaut: false
    }
  },
  setup(props, context) { 
    const color = ref(props.dirty ? "danger" : "primary")
    const icon = ref(props.dirty ? trashOutline : addOutline)
    const measures = ref([])

    const clicked = () => {
      let action = "delete"
      if(color.value !== "danger") {
        action = "add"
        color.value = "danger"
        icon.value = trashOutline
        context.emit('update:dirty', true)
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

    const getMeasure = async () => {
      try {
        const response = await recipeService.getMeasure()
        measures.value = response.data.data
      }
      catch(e) {
        console.log(e || e.response)
      }
    }

    getMeasure()

    return {
      clicked,
      color,
      icon,
      isDisabled,
      measures
    }
  }
});
</script>

<style scoped>
.item-padding {
  padding: 0 5px;
}
</style>