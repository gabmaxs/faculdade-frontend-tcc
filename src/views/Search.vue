<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Buscar receita</ion-title>
        <ion-buttons slot="end">
            <ion-button @click="openModal"><ion-icon :icon="search"></ion-icon></ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Buscar receita</ion-title>
          <ion-buttons slot="end">
              <ion-button @click="openModal"><ion-icon :icon="search"></ion-icon></ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      
      <div class="container">
        <ion-button v-if="recipes.length == 0" @click="openModal">Digitar Ingredientes</ion-button>
        <Modal :is-progress="isSendingRequest" title="Buscar Receita" @onDismiss="closeModal" v-if="showModal">
          <IngredientSearch @success="handleSuccess" @progress="handleProgress" />
        </Modal>
        <RecipesList v-if="recipes.length > 0" :recipeList="recipes" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonIcon } from '@ionic/vue'
import { search } from 'ionicons/icons';
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
    IonButtons,
    IonIcon,
    Modal
  },
  setup() {
    const isSendingRequest = ref(false)
    const recipes = ref<any>([])
    const showModal = ref(true)

    const handleProgress = (state: any) => {
      isSendingRequest.value = state
    }

    const handleSuccess = (list: any) => {
      showModal.value = false
      recipes.value = list
    }

    const openModal = () => {
      showModal.value = true
    }

    const closeModal = () => {
      showModal.value = false
    }

    return {
      handleProgress,
      handleSuccess,
      openModal,
      closeModal,
      isSendingRequest,
      recipes,
      showModal,
      search
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