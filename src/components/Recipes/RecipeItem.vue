<template>
    <ion-card @click="click(recipe.id)">
        <img class="card-img" v-if="recipe.image" :src="recipe.image">
        <ion-card-header>
            <ion-card-title>{{ recipe.name }}</ion-card-title>
            <ion-card-subtitle> <ion-badge color="secondary"> {{ categoryName }} </ion-badge></ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
            <ion-chip color="success">
                <ion-label>{{ recipe.matched_ingredients.length }}/{{ recipe.total_ingredients }} ingredientes necessários</ion-label>
            </ion-chip> 
            <ion-chip color="tertiary">
                <ion-label>{{ recipe.matched_ingredients.length }}/{{ researchedIngredients }} ingredientes pesquisados</ion-label>
            </ion-chip>
        </ion-card-content>
    </ion-card>
</template>

<script lang="ts">
import { categoryService } from "@/services";
import { computed, defineComponent, ref } from 'vue'
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonLabel, IonChip, IonBadge } from "@ionic/vue"
import { useStore } from "vuex";

export default defineComponent({    
    name: "RecipeItem",
    components: { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonLabel, IonChip, IonBadge },
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
            categoryName,
            researchedIngredients: computed(() => store.getters.getListQuantity)
        }
    }
})
</script>

<style scoped>
.card-img {
    width: 100%;
}

ion-card {
    max-width: 300px;
}
</style>