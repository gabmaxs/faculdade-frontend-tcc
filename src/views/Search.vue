<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Buscar receita</ion-title>
        <ion-buttons slot="end">
            <ion-button @click="openModal"><ion-icon :icon="searchOutline"></ion-icon></ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Buscar receita</ion-title>
          <ion-buttons slot="end">
              <ion-button @click="openModal"><ion-icon :icon="searchOutline"></ion-icon></ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      
      <div class="container">
        <ion-button v-if="recipes.length == 0" @click="openModal">Digitar Ingredientes</ion-button>
        <Modal :is-progress="isSendingRequest" title="Buscar receita" @onDismiss="closeModal" v-if="showModal">
          <SearchRecipe @success="handleSuccess" @progress="handleProgress" />
        </Modal>
        <RecipesList :recipeList="recipes.list" :researchedIngredients="recipes.researchedIngredients" @click="navigateToRecipe" />
        <Modal text-close="Voltar" v-if="selectedRecipe" title="Detalhes da receita" @onDismiss="closeModalRecipe" >
          <Recipe :recipeId="selectedRecipe" />
        </Modal>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonIcon } from '@ionic/vue'
import { searchOutline } from 'ionicons/icons';
import { SearchRecipe } from '@/components/SearchRecipe'
import { RecipesList, Recipe } from '@/components/Recipes'
import { Modal } from '@/components/Common'
import { defineComponent, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'Search',
  components: { 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonPage, 
    SearchRecipe, 
    RecipesList,
    Recipe,
    IonButton,
    IonButtons,
    IonIcon,
    Modal
  },
  setup() {
    const isSendingRequest = ref(false)
    const recipes = ref({
      list: [],
      researchedIngredients: []
    })
    const showModal = ref(true)
    const selectedRecipe = ref<number>()
    const route = useRoute()
    const router = useRouter()

    const handleProgress = (state: any) => {
      isSendingRequest.value = state
    }

    const handleSuccess = (response: any) => {
      console.log(response)
      showModal.value = false
      recipes.value.list = response.list
      recipes.value.researchedIngredients = response.researchedIngredients
    }

    const openModal = () => {
      showModal.value = true
    }

    const closeModal = () => {
      showModal.value = false
    }

    const navigateToRecipe = (id: number) => {
      selectedRecipe.value = id
      router.push({path: "/search", query: {recipeId: id}})
    }

    const closeModalRecipe = () => {
      selectedRecipe.value = undefined
      router.back()
    }

    watchEffect(() => route.query.recipeId ? navigateToRecipe(+route.query.recipeId) : "")

    return {
      handleProgress,
      handleSuccess,
      openModal,
      closeModal,
      navigateToRecipe,
      closeModalRecipe,
      isSendingRequest,
      recipes,
      showModal,
      searchOutline,
      selectedRecipe
    }
  }
})
</script>

<style scoped>
.container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>