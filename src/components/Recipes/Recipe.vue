<template>
    <div>
        <div v-if="recipe">
            <div class="full-image">
                <img v-if="recipe.image" :src="recipe.image">
            </div>
            <ion-card-header>
                <ion-card-title>{{ recipe.name }}</ion-card-title>
                <ion-card-subtitle>Tempo de preparo: {{ recipe.cooking_time }} min</ion-card-subtitle>
                <ion-card-subtitle>Serve até: {{ recipe.number_of_servings }} pessoa(s)</ion-card-subtitle>
                <ion-card-subtitle>{{ categoryName }}</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
                <ion-list>
                    <ion-list-header>Ingredientes</ion-list-header>
                    <ion-item>
                        <ul>
                            <li v-for="(ingredient, k) in recipe.ingredients" :key="k">
                                <span>{{ `${ingredient.quantity} ${ingredient.measure} de ${ingredient.name}`}}</span>
                            </li>
                        </ul>
                    </ion-item>
                </ion-list>

                <ion-list>
                    <ion-list-header>Preparo</ion-list-header>
                    <ion-item>
                        <ul>
                            <li v-for="(cook, k) in recipe.how_to_cook" :key="k">
                                <span>{{ cook }}</span>
                            </li>
                        </ul>
                    </ion-item>
                </ion-list>
            </ion-card-content>
        </div>
        <Message @onDismiss="messageConfig.show = false" :show="messageConfig.show" :isSuccess="messageConfig.isSuccess" :message="messageConfig.text" />
    </div>
</template>

<script lang="ts">
import { categoryService, recipeService } from '@/services';
import { defineComponent, ref } from 'vue';
import { IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonList, IonListHeader, IonItem } from "@ionic/vue"
import { Message } from "@/components/Common"

export default defineComponent({
    name: "Recipe",
    props: ["recipeId"],
    components: { IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonList, IonListHeader, IonItem, Message },
    setup(props) {
        const recipe = ref()
        const categoryName = ref("")
        const messageConfig = ref({
            isSuccess: false,
            text: "",
            show: false
        })

        const resolveCategoryName = async (category_id) => categoryName.value = await categoryService.getCategoryName(category_id)

        const handleSuccess = async ({data, message}) => {
            messageConfig.value.text = message
            messageConfig.value.isSuccess = true
            messageConfig.value.show = true
            recipe.value = data
            resolveCategoryName(data.category_id)
        }

        const handleError = ({data, message}: {data: Array<any>; message: string}) => {
            messageConfig.value.text = message
            messageConfig.value.isSuccess = false
            messageConfig.value.show = true
            console.log(data, message)
        }

        const getRecipe = async (id: number) => {
            try {
                const response = await recipeService.getRecipe(id)
                handleSuccess(response.data)
            }
            catch(e) {
                handleError(e.response.data || e)
            }
        }

        getRecipe(props.recipeId)

        return {
            recipe,
            categoryName,
            messageConfig
        }
    }
})
</script>

<style scoped>
.full-image img {
    width: 100%;
    height: auto;
}
</style>