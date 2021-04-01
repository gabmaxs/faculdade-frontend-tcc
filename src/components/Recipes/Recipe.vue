<template>
    <div>
        <div v-if="recipe">
            <div class="full-image">
                <img v-if="recipe.image" :src="recipe.image">
                <img v-else src="../../../public/assets/image.jpeg">
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
    </div>
</template>

<script lang="ts">
import { categoryService, recipeService } from '@/services';
import { defineComponent, ref } from 'vue';
import { IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonList, IonListHeader, IonItem } from "@ionic/vue"

export default defineComponent({
    name: "Recipe",
    props: ["recipeId"],
    components: { IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonList, IonListHeader, IonItem },
    setup(props) {
        const recipe = ref()
        const categoryName = ref("")

        const resolveCategoryName = async (id) => {
            try {
                const {data} = await categoryService.getCategoryById(id)
                return data.data.name
            }
            catch(e) {
                console.log(e)
                return ""
            }
        }

        const handleSuccess = async ({data}) => {
            recipe.value = data
            console.log(data)
            categoryName.value = await resolveCategoryName(data.category_id)
        }

        const getRecipe = async (id) => {
            try {
                const response = await recipeService.getRecipe(id)
                handleSuccess(response.data)
            }
            catch(e) {
                console.log(e)
            }
        }

        getRecipe(props.recipeId)

        return {
            recipe,
            categoryName
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