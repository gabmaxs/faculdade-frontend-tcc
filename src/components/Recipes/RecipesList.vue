<template>
    <ion-list>
        <RecipeItem v-for="recipe in recipeList" :recipe="recipe" :key="recipe.id" @click="itemClicked" />
    </ion-list>
</template>

<script lang="ts">
import { IonList} from "@ionic/vue"
import { defineComponent } from 'vue';
import RecipeItem from "./RecipeItem.vue"

export default defineComponent({
    name: "RecipesList",
    props: ["recipeList"],
    components: {
        IonList, 
        RecipeItem
    },
    emits: ["click"],
    setup(_,context) {
        const itemClicked = (id: number) => context.emit("click", id)

        return {
            itemClicked
        }
    }
})
</script>

<style scoped>
ion-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}
</style>