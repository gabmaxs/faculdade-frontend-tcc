<template>
    <ion-item @click="click(recipe.id)">
        <ion-avatar slot="start">
            <img v-if="recipe.image" :src="recipe.image">
        </ion-avatar>
        <ion-label>
            <h2>{{ recipe.name }}</h2>
            <h3>{{ categoryName }}</h3>
        </ion-label>
    </ion-item>
</template>

<script lang="ts">
import { categoryService } from "@/services";
import { defineComponent, ref } from 'vue'
import { IonItem, IonAvatar, IonLabel } from "@ionic/vue"

export default defineComponent({    
    name: "RecipeItem",
    components: { IonItem, IonAvatar, IonLabel },
    emits: ["click"],
    props: {
        recipe: {
            required: true
        }
    },
    setup(props, context) {
        const categoryName = ref("")

        const resolveCategoryName = async () => categoryName.value = await categoryService.getCategoryName(props.recipe.category_id)
        resolveCategoryName()

        const click = (id: number) => context.emit("click", id)

        return {
            categoryName,
            click
        }
    }
})
</script>