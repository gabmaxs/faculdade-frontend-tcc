<template>
    <div>
        <ion-item>
              <ion-label position="floating">Nome da receita</ion-label>
              <ion-input v-model="form.name" type="text"></ion-input>
        </ion-item>
        <ion-item>
              <input v-on:change="handleImage" type="file" id="file" class="fileInput" />
              <label for="file">Selecionar imagem</label>
        </ion-item>
        <ion-item>
            <ion-label position="floating">Tipo de receita</ion-label>
            <ion-select cancel-text="Cancelar" v-model="form.category_id" interface="action-sheet">
                <ion-select-option value="1">Categorias</ion-select-option>
            </ion-select>
        </ion-item>
        <ion-item>
            <ion-label position="floating">Quantidade de pessoas que serve</ion-label>
            <ion-select cancel-text="Cancelar" v-model="form.number_of_servings" interface="action-sheet">
                <ion-select-option value="1">1 Pessoa</ion-select-option>
                <ion-select-option value="2">2 Pessoas</ion-select-option>
                <ion-select-option value="3">3 Pessoas</ion-select-option>
                <ion-select-option value="4">4 Pessoas</ion-select-option>
                <ion-select-option value="5">5 Pessoas</ion-select-option>
            </ion-select>
        </ion-item>
        <ion-item>
            <ion-label position="floating">Tempo de preparo</ion-label>
            <ion-input type="number" v-model="form.cooking_time" placeholder="Tempo em minutos"></ion-input>
        </ion-item>
        <ion-item>
            <ion-label position="floating">Ingredientes</ion-label>
            <ion-textarea rows="10" v-model="form.list_of_ingredients" placeholder="Separe cada passo com um Enter"></ion-textarea>
        </ion-item>
        <ion-item>
            <ion-label position="floating">Modo de preparo</ion-label>
            <ion-textarea rows="10" v-model="form.how_to_cook" placeholder="Separe cada passo com um Enter"></ion-textarea>
        </ion-item>
        <ion-row>
          <ion-col size="8" offset="2">
            <ion-button @click="sendForm" expand="block">Salvar</ion-button>
          </ion-col>
        </ion-row>
    </div>
</template>

<script lang="ts">
import { IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonTextarea, IonRow, IonCol, IonButton } from '@ionic/vue';
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: "RecipeForm",
    components: { IonItem, IonLabel, IonInput, IonSelect, IonTextarea, IonSelectOption, IonRow, IonCol, IonButton },
    setup() {
        const form = ref({
            name: "",
            category_id: "",
            image: "",
            number_of_servings: "",
            cooking_time: "",
            how_to_cook: "",
            list_of_ingredients: ""
        })

        const handleImage = (event) => {
            const file = event.target.files[0]
            console.log(file)
            form.value.image = file
        }

        const sendForm = () => {
            console.log(form.value)
        }

        return {
            handleImage,
            sendForm,
            form
        }
    }
})
</script>

<style scoped>
.fileInput {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
    }
.fileInput   label {
    color: #717171;
    background-color: white;
    display: inline-block;
    cursor: pointer;
    padding: .5em 1em;
    border: 1px solid #ccc;
    cursor: pointer;
}
</style>