<template>
    <div>
        <ion-item @click="showOptions = !showOptions">
          <ion-label>Personalizar Busca</ion-label>
          <ion-icon :icon="optionsOutline"></ion-icon>
        </ion-item>
        <ion-list v-if="showOptions">
          <ion-button expand="full" fill="outline" color="dark" @click="cleanOptions">Limpar</ion-button>
          <ion-item>
            <ion-label>Categoria</ion-label>
            <ion-select interface="action-sheet" cancel-text="Cancelar" v-model="category">
              <ion-select-option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Tempo Máximo</ion-label>
            <ion-input placeholder="Em minutos" v-model="max_time" type="number"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Tempo Mínimo</ion-label>
            <ion-input placeholder="Em minutos" v-model="min_time" type="number"></ion-input>
          </ion-item>
        </ion-list>
    </div>
</template>

<script lang="ts">
import { IonItem, IonList, IonLabel, IonSelect, IonSelectOption, IonInput, IonIcon, IonButton } from "@ionic/vue"
import { defineComponent, ref, watch } from 'vue'
import { optionsOutline } from "ionicons/icons"
import { categoryService } from "@/services"

export default defineComponent({
    name: "IngredientSearchOptions",
    components: { IonItem, IonList, IonLabel, IonSelect, IonSelectOption, IonInput, IonIcon, IonButton },
    emits: ["update:modelValue"],
    props: {
      modelValue: {
        type: Object,
        required: true
      }
    },
    setup(props, context) {
        const showOptions = ref(false)
        const categories = ref<any>([])
        const category = ref(props.modelValue.category || null)
        const min_time = ref(props.modelValue.min_time || null)
        const max_time = ref(props.modelValue.max_time || null)

        const getCategories = async () => {
          try {
            const {data} = await categoryService.getCategories()
            categories.value = data.data
          }
          catch(e) {
            console.log(e)
          }
        }

        const cleanOptions = () => {
          category.value = null
          min_time.value = null
          max_time.value = null
        }

        const emitEvent = () => context.emit("update:modelValue", {
          category: category.value, 
          min_time: min_time.value, 
          max_time: max_time.value
        })

        watch([category, min_time, max_time], () => emitEvent())

        getCategories()

        return {
            cleanOptions,
            showOptions,
            categories,
            category,
            min_time,
            max_time,
            optionsOutline
        }
    }
})
</script>