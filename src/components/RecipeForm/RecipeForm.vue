<template>
    <ion-item-group>
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
                <ion-select-option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</ion-select-option>
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
        <ion-item-divider>
            <ion-label>Ingredientes</ion-label>
        </ion-item-divider>
        <IngredientSearchInput v-for="(item, key) in (arrayIngredients)" 
            v-bind:key="key" 
            @action="(action) => handleAction(action, key)"  
            v-model="item.value" 
            v-model:quantity="item.quantity"
            v-model:measure="item.measure"
            has-config
        />
        <ion-item>
            <ion-label position="floating">Modo de preparo</ion-label>
            <ion-textarea rows="10" v-model="form.how_to_cook" placeholder="Separe cada passo com um Enter"></ion-textarea>
        </ion-item>
        <ion-row>
          <ion-col size="8" offset="2">
            <ion-button @click="sendForm" expand="block">Salvar</ion-button>
          </ion-col>
        </ion-row>
    </ion-item-group>
</template>

<script lang="ts">
import { categoryService, recipeService } from '@/services';
import IngredientSearchInput from "@/components/IngredientSearch/IngredientSearchInput.vue"
import { 
    IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonTextarea,
    IonRow, IonCol, IonButton, IonItemDivider, IonItemGroup 
} from '@ionic/vue';
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex';

export default defineComponent({
    name: "RecipeForm",
    components: { 
        IonItem, IonLabel, IonInput, IonSelect, IonTextarea, IonSelectOption,
        IonRow, IonCol, IonButton, IonItemDivider, IonItemGroup, IngredientSearchInput
    },
    setup() {
        const arrayIngredients = ref([{value:"", quantity: null, measure: ''}])
        const handleAction = (value: string, key: any) => {
            if(value == "add")  arrayIngredients.value.push({value:"", quantity: null, measure: ''})
            if(value == "delete") arrayIngredients.value.splice(key, 1)
        }
        
        const form = ref({
            name: "",
            category_id: "",
            image: "",
            number_of_servings: "",
            cooking_time: "",
            how_to_cook: "",
            list_of_ingredients: ""
        })

        const categories = ref([])

        const handleImage = (event) => {
            const file = event.target.files[0]
            console.log(file)
            form.value.image = file
        }

        const store = useStore()
        const sendForm = async () => {
            console.log(form.value)

            try {
                const token = store.getters.getToken
                const response = await recipeService.sendRecipe(form.value, token)
                console.log(response.data)
            }
            catch(e) {
                console.log(e) 
                console.log(e.response)
            }
        }

        const getCategories = async () => {
            try {
                const {data} = await categoryService.getCategories()
                categories.value = data.data
            }
            catch(e) {
                console.log(e.reponse)
            }
        }

        getCategories()

        return {
            handleAction,
            handleImage,
            sendForm,
            form,
            categories,
            arrayIngredients
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