<template>
    <ion-item-group>
        <ion-item>
              <ion-label position="floating">Nome da receita</ion-label>
              <ion-input v-model="form.name" type="text"></ion-input>
        </ion-item>
        <ion-item-divider>
            <ion-label>Selecionar imagem</ion-label>
        </ion-item-divider>
        <FileUpload @fileUploadComplete="handleFileUpload" server="recipe/image" />
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
                <ion-select-option value="6">6 Pessoa</ion-select-option>
                <ion-select-option value="7">7 Pessoas</ion-select-option>
                <ion-select-option value="8">8 Pessoas</ion-select-option>
                <ion-select-option value="9">9 Pessoas</ion-select-option>
                <ion-select-option value="10">10 Pessoas</ion-select-option>
            </ion-select>
        </ion-item>
        <ion-item>
            <ion-label position="floating">Tempo de preparo</ion-label>
            <ion-input type="number" v-model="form.cooking_time" placeholder="Tempo em minutos"></ion-input>
        </ion-item>
        <ion-item-divider>
            <ion-label>Ingredientes</ion-label>
        </ion-item-divider>
        <IngredientList v-model="arrayIngredients" has-config />
        <ion-item>
            <ion-label position="floating">Modo de preparo</ion-label>
            <ion-textarea rows="10" v-model="form.how_to_cook_text" placeholder="Separe cada passo com um Enter"></ion-textarea>
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
import IngredientList from "../Ingredient/IngredientList.vue"
import { 
    IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonTextarea,
    IonRow, IonCol, IonButton, IonItemDivider, IonItemGroup 
} from '@ionic/vue';
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex';
import { FileUpload } from '@/components/Common'
import { v4 as uuidv4 } from 'uuid'

export default defineComponent({
    name: "RecipeForm",
    components: { 
        IonItem, IonLabel, IonInput, IonSelect, IonTextarea, IonSelectOption,
        IonRow, IonCol, IonButton, IonItemDivider, IonItemGroup, IngredientList,
        FileUpload
    },
    emits: ["end", "loading"],
    setup(_, context) {
        const arrayIngredients = ref([{name:"", quantity: null, measure: '', uuid: uuidv4(), dirty: false}])
        const form = ref<any>({
            name: "",
            category_id: "",
            image: "",
            number_of_servings: "",
            cooking_time: "",
            how_to_cook_text: "",
            how_to_cook: null,
            list_of_ingredients: {}
        })
        form.value.how_to_cook = computed(() => form.value.how_to_cook_text.split("\n"))
        const categories = ref([])

        const handleFileUpload = (value) => form.value.image = value

        const clearForm = () => {
            form.value.name = ""
            form.value.category_id = ""
            form.value.image = ""
            form.value.number_of_servings = ""
            form.value.cooking_time = ""
            form.value.how_to_cook_text = ""
            form.value.list_of_ingredients = {}
            arrayIngredients.value = [{name:"", quantity: null, measure: '', uuid: uuidv4(), dirty: false}]
        }

        const handleSuccess = ({message}) => {
            const data = {
                returnMessage: message,
                responseIsSuccessful: true,
                showMessage: true
            }
            clearForm()
            context.emit("end", data)
            context.emit("loading", false)
        }

        const handleError = ({message, error}: {message: any; error: any}) => {
            const data = {
                returnMessage: message,
                responseIsSuccessful: false,
                showMessage: true
            }

            if(error.code == 422) {
                data.returnMessage = Object.values(message)[0]
            }

            context.emit("end", data)
            context.emit("loading", false)
        }

        const store = useStore()
        const sendForm = async () => {
            context.emit("loading", true)
            form.value.list_of_ingredients = arrayIngredients.value
            try {
                const token = store.getters.getToken
                const response = await recipeService.saveRecipe(form.value, token)
                handleSuccess(response.data)
            }
            catch(e) {
                console.log(e.response)
                handleError(e.response.data || e)
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
            handleFileUpload,
            arrayIngredients,
            sendForm,
            form,
            categories,
        }
    }
})
</script>