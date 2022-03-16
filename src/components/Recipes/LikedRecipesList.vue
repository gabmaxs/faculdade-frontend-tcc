<template>
    <ion-list>
        <ion-item v-for="(recipe) in recipeList" :key="recipe.id" @click="itemClicked(recipe.id)">
            <ion-card-header>
                <ion-card-title>{{ recipe.name }}</ion-card-title>
            </ion-card-header>
        </ion-item>
    </ion-list>
</template>

<script lang="ts">
import { IonList, IonItem, IonCardTitle, IonCardHeader } from "@ionic/vue"
import { defineComponent } from 'vue'

export default defineComponent({
    name: "LikedRecipesList",
    props: ["recipeList"],
    components: {
        IonList, 
        IonItem, 
        IonCardTitle,  
        IonCardHeader
    },
    emits: ["click"],
    setup(_, context) {
        const itemClicked = (id: number) => {
            context.emit("click", id)
        }

        return {
            itemClicked
        }
    }
})
</script>