<template>
    <div>
        <ion-item @click="showOptions = !showOptions">
          <ion-label>Personalizar Busca</ion-label>
          <ion-icon :icon="optionsOutline"></ion-icon>
        </ion-item>
        <ion-list v-if="showOptions">
          <ion-item>
            <ion-label>Categoria</ion-label>
            <ion-select multiple>
              <ion-select-option value="a">A</ion-select-option>
              <ion-select-option value="b">B</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label>Tempo Maximo</ion-label>
            <ion-input type="number"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>Tempo Minimo</ion-label>
            <ion-input type="number"></ion-input>
          </ion-item>
        </ion-list>
    </div>
</template>

<script lang="ts">
import { IonItem, IonList, IonLabel, IonSelect, IonSelectOption, IonInput, IonIcon } from "@ionic/vue"
import { defineComponent } from 'vue'
import { optionsOutline } from "ionicons/icons"

export default defineComponent({
    name: "IngredientSearchOptions",
    components: { IonItem, IonList, IonLabel, IonSelect, IonSelectOption, IonInput, IonIcon },
    data() {
        return {
            showOptions: false
        }
    },
    setup() {
        return {
            optionsOutline
        }
    }
})
</script>