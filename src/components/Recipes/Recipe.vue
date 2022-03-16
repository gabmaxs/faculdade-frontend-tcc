<template>
    <div>
        <div v-if="recipe">
            <div class="full-image">
                <img v-if="recipe.image" :src="recipe.image">
            </div>
            <ion-card-header>
                <ion-card-title class="title-name">
                    <span>{{ recipe.name }}</span>
                    <span class="icon-group" v-if="isUserLogged">
                        <ion-icon v-if="isLiked" class="first-icon is-liked" :icon="heart" @click="handleLike" />
                        <ion-icon v-else class="first-icon" :icon="heartOutline" @click="handleLike" />
                        <ion-icon :icon="shareSocialOutline" />
                    </span>
                </ion-card-title>
                <ion-card-subtitle>Tempo de preparo: {{ recipe.cooking_time }} min</ion-card-subtitle>
                <ion-card-subtitle>Serve até: {{ recipe.number_of_servings }} pessoa(s)</ion-card-subtitle>
                <ion-card-subtitle>{{ categoryName }}</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
                <ion-list>
                    <ion-list-header>Ingredientes</ion-list-header>
                    <ion-item>
                        <ul>
                            <li v-for="(ingredient) in recipe.ingredients" :key="ingredient.name">
                                <span v-if="ingredient.quantity > 0">{{ `${ingredient.quantity} ${ingredient.measure} de ${ingredient.name}`}}</span>
                                <span v-else>{{ `${ingredient.name} a gosto` }}</span>
                            </li>
                        </ul>
                    </ion-item>
                </ion-list>

                <ion-list>
                    <ion-list-header>Preparo</ion-list-header>
                    <ion-item>
                        <ul>
                            <li v-for="(cook) in recipe.how_to_cook" :key="cook">
                                <span>{{ cook }}</span>
                            </li>
                        </ul>
                    </ion-item>
                </ion-list>
            </ion-card-content>
        </div>
        <Message @onDismiss="messageConfig.show = false" :show="messageConfig.show" :isSuccess="messageConfig.isSuccess" :message="messageConfig.text" />
    </div>
</template>

<script lang="ts">
import { categoryService, recipeService } from '@/services';
import { computed, defineComponent, ref } from 'vue';
import { IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonList, IonListHeader, IonItem, IonIcon } from "@ionic/vue"
import { heartOutline, shareSocialOutline, heart } from 'ionicons/icons'
import { Message } from "@/components/Common"
import { useStore } from 'vuex';

export default defineComponent({
    name: "Recipe",
    props: ["recipeId"],
    components: { IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonList, IonListHeader, IonItem, IonIcon, Message },
    setup(props) {
        const isLiked = ref(false)
        const recipe = ref()
        const categoryName = ref("")
        const messageConfig = ref({
            isSuccess: false,
            text: "",
            show: false
        })
        const store = useStore()
        const isUserLogged = computed(() => store.getters.isTheUserLoggedIn)

        const resolveCategoryName = async (category_id) => categoryName.value = await categoryService.getCategoryName(category_id)

        const handleSuccess = async ({data, message}) => {
            messageConfig.value.text = message
            messageConfig.value.isSuccess = true
            messageConfig.value.show = true
            recipe.value = data
            resolveCategoryName(data.category_id)
        }

        const handleError = ({data, message}: {data: Array<any>; message: string}) => {
            messageConfig.value.text = message
            messageConfig.value.isSuccess = false
            messageConfig.value.show = true
            console.log(data, message)
        }

        const handleLike = () => {
            isLiked.value = !isLiked.value
            recipeService.likeRecipe(recipe.value, store.getters.getToken)
        }

        const getRecipe = async (id: number) => {
            try {
                const response = await recipeService.getRecipe(id)
                handleSuccess(response.data)
            }
            catch(e) {
                handleError(e.response.data || e)
            }
        }

        getRecipe(props.recipeId)

        return {
            handleLike,
            recipe,
            categoryName,
            messageConfig,
            isUserLogged,
            isLiked,
            heartOutline,
            shareSocialOutline,
            heart
        }
    }
})
</script>

<style scoped>
.full-image img {
    width: 100%;
    height: auto;
}

.title-name {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.icon-group {
    display: flex;
    align-items: center;
}

.first-icon {
    margin-right: 5px;
}

.is-liked {
    color: #b8031b;
}
</style>