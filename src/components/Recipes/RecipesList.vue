<template>
    <div>
        <ion-list>
            <ion-item v-for="recipe in newRecipeList" :key="recipe.id">
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
import { categoryService } from "@/services";
import { IonList, IonItem, IonAvatar, IonLabel } from "@ionic/vue"
import { defineComponent, onBeforeUpdate, ref } from 'vue';

export default defineComponent({
    name: "RecipesList",
    props: ["recipeList"],
    components: {
        IonList, 
        IonItem, 
        IonAvatar, 
        IonLabel
    },
    setup(props) {
        const newRecipeList = ref<any>([])

        const getCategoryName = async (id: number) => {
            try {
                const {data} = await categoryService.getCategoryById(id)
                return data.data.name
            }
            catch(e) {
                console.log(e)
                return ""
            }
        }

        const getListWithCategory = (list: any) => {
            const newList = list.map( async (item: any) => {
                const name = await getCategoryName(item.id)
                return {
                    ...item,
                    categoryName: name
                }
            })

            return newList
        }

        const init = async () => {
            const newList = await Promise.all(getListWithCategory(props.recipeList))
            newRecipeList.value = newList
        }
        init()

        onBeforeUpdate(init)

        return {
            newRecipeList
        }
    }
})
</script>