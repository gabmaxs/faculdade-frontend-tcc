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
    <ion-content :fullscreen="true" :forceOverscroll="true">
      
      <div v-if="recipes.length == 0" class="container">
        <div class="user-div" v-if="userIsLogged">
          <span>Olá,</span> 
          <span class="user-name">{{ user.name }}</span>
        </div>
        <ion-card @click="openModal">
          <ion-grid>
            <ion-row>
              <ion-col size="7" class="ion-text-start">
                <h1>Buscar</h1>
                <p>
                  Nos conte os ingredientes que você tem e te falamos o que você pode fazer.
                </p>  
              </ion-col>
              <ion-col size="5" class="icon-flex">
                <ion-icon class="icon-bigger" :icon="searchOutline"></ion-icon>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card>
      </div>
      <Modal :is-progress="isSendingRequest" title="Buscar receita" @onDismiss="closeModal" v-if="showModal">
        <SearchRecipe @success="handleSuccess" @progress="handleProgress" />
      </Modal>
      <div class="div-list" v-if="recipes.length > 0">
        <RecipesList :recipeList="recipes" @click="navigateToRecipe" />
      </div>
      <Modal text-close="Voltar" v-if="selectedRecipe" title="Detalhes da receita" @onDismiss="closeModalRecipe" >
        <Recipe :recipeId="selectedRecipe" />
      </Modal>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonIcon, IonCard, IonGrid, IonRow, IonCol } from '@ionic/vue'
import { searchOutline } from 'ionicons/icons';
import { SearchRecipe } from '@/components/SearchRecipe'
import { RecipesList, Recipe } from '@/components/Recipes'
import { Modal } from '@/components/Common'
import { computed, defineComponent, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

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
    IonCard, 
    IonGrid, 
    IonRow, 
    IonCol,
    Modal
  },
  setup() {
    const isSendingRequest = ref(false)
    const recipes = ref<any>([])
    const showModal = ref(true)
    const selectedRecipe = ref<number>()
    const route = useRoute()
    const router = useRouter()

    const store = useStore()
    const userIsLogged = computed(() => store.getters.isTheUserLoggedIn)
    const user = computed(() => store.getters.getUser)

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
      selectedRecipe,
      userIsLogged,
      user
    }
  }
})
</script>

<style scoped>
.container {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.icon-bigger {
  font-size: 50px;
}
.icon-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 5px;
  margin: 5px;
}
.user-name {
  margin-top: 2px;
  font-size: 24px;
  font-weight: 600;
  text-transform: uppercase;
}

.div-list {
  padding: 5px;
}
</style>