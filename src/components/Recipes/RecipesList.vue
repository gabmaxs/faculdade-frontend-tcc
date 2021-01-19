<template>
    <div>
        <ion-list>
            {{ recipeList }}
            <ion-item v-for="recipe in recipeList" :key="recipe.id">
                <ion-avatar slot="start">
                    <img :src="recipe.image">
                </ion-avatar>
                <ion-label>
                    <h2>{{ recipe.name }}</h2>
                    <h3>{{ recipe.categoryName }}</h3>
                </ion-label>
            </ion-item>
        </ion-list>
    </div>
</template>

<script lang="ts">
import { IonList, IonItem, IonAvatar, IonLabel } from "@ionic/vue"
import { defineComponent } from 'vue';

export default defineComponent({
    name: "RecipesList",
    props: ["recipeList"],
    components: {
        IonList, 
        IonItem, 
        IonAvatar, 
        IonLabel
    }
})
</script>