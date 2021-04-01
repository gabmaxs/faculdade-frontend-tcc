<template>
    <div>
        <ion-list>
            <ion-item v-for="recipe in newRecipeList" :key="recipe.id" @click="itemClicked(recipe.id)">
                <ion-avatar slot="start">
                    <img v-if="recipe.image" :src="recipe.image">
                    <img src="../../../public/assets/image.jpeg">
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
    emits: ["click"],
    setup(props,context) {
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

        const itemClicked = (id) => {
            console.log(id)
            context.emit("click", id)
        }

        const init = async () => {
            const newList = await Promise.all(getListWithCategory(props.recipeList))
            newRecipeList.value = newList
        }
        init()

        onBeforeUpdate(init)

        return {
            itemClicked,
            newRecipeList
        }
    }
})
</script>