<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Buscar receita</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Buscar receita</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <div class="container">
        <ion-button @click="openModal = true">Digitar Ingredientes</ion-button>
        <Modal :is-progress="isSendingRequest" title="Buscar Receita" @onDismiss="openModal = false" v-if="openModal">
          <IngredientSearch @success="handleSuccess" @progress="handleProgress" />
        </Modal>
        <RecipesList v-if="recipes.length > 0" :recipeList="recipes" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue'
import { IngredientSearch } from '@/components/IngredientSearch'
import { RecipesList } from '@/components/Recipes'
import { Modal } from '@/components/Common'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Search',
  components: { 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonPage, 
    IngredientSearch, 
    RecipesList,
    IonButton,
    Modal
  },
  setup() {
    const isSendingRequest = ref(false)
    const recipes = ref<any>([])
    const openModal = ref(true)

    const handleProgress = (state: any) => {
      isSendingRequest.value = state
    }

    const handleSuccess = (list: any) => {
      openModal.value = false
      recipes.value = list
    }

    return {
      handleProgress,
      handleSuccess,
      isSendingRequest,
      recipes,
      openModal
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