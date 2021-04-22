<template>
    <div>
        <ion-list>
            <RecipeItem v-for="recipe in recipeList" :recipe="recipe" :key="recipe.id" @click="itemClicked" :researchedIngredients="researchedIngredients.length" />
        </ion-list>
    </div>
</template>

<script lang="ts">
import { IonList} from "@ionic/vue"
import { defineComponent } from 'vue';
import RecipeItem from "./RecipeItem.vue"

export default defineComponent({
    name: "RecipesList",
    props: ["recipeList", "researchedIngredients"],
    components: {
        IonList, 
        RecipeItem
    },
    emits: ["click"],
    setup(props,context) {
        console.log(props.researchedIngredients)
        const itemClicked = (id: number) => context.emit("click", id)

        return {
            itemClicked
        }
    }
})
</script>