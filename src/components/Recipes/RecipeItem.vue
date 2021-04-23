<template>
    <ion-item @click="click(recipe.id)">
        <ion-avatar slot="start">
            <img v-if="recipe.image" :src="recipe.image">
        </ion-avatar>
        <ion-label>
            <h2>{{ recipe.name }}</h2>
            <h3>{{ categoryName }}</h3>  
        </ion-label>
        <ion-chip slot="end" color="success">
            <ion-label>{{ recipe.matched_ingredients.length }}/{{ recipe.total_ingredients }}</ion-label>
            <ion-icon :icon="checkmarkCircleOutline"></ion-icon>
        </ion-chip> 
    </ion-item>
</template>

<script lang="ts">
import { categoryService } from "@/services";
import { computed, defineComponent, ref } from 'vue'
import { IonItem, IonAvatar, IonLabel, IonChip, IonIcon } from "@ionic/vue"
import { checkmarkCircleOutline } from 'ionicons/icons';
import { useStore } from "vuex";

export default defineComponent({    
    name: "RecipeItem",
    components: { IonItem, IonAvatar, IonLabel, IonChip, IonIcon },
    emits: ["click"],
    props: {
        recipe: {
            required: true,
            type: Object
        }
    },
    setup(props, context) {
        const categoryName = ref("")
        const store = useStore()

        const resolveCategoryName = async () => categoryName.value = await categoryService.getCategoryName(props.recipe.category_id)

        const click = (id: number) => context.emit("click", id)

        resolveCategoryName()

        return {
            click,
            checkmarkCircleOutline,
            categoryName,
        }
    }
})
</script>