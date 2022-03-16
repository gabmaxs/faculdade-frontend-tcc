<template>
  <ion-page>
    <ion-header>
      <ProgressBar v-if="isProgress" />
      <ion-toolbar>
        <ion-title>Perfil</ion-title>
        <ion-buttons v-if="userIsLogged" slot="end">
            <ion-button @click="logout"><ion-icon :icon="logOutOutline"></ion-icon></ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">

      <Message 
          @dismiss="handleDismiss" 
          :show="configMessage.showMessage" 
          :isSuccess="configMessage.responseIsSuccessful" 
          :message="configMessage.returnMessage" 
      />
    
      <AuthCard 
        v-if="!userIsLogged" 
        @progress="changeProgress" 
        @end="handleEnd"
      />
      <ProfileCard v-if="userIsLogged" @progress="changeProgress" @end="handleEnd" />
      <ion-card v-if="userIsLogged">
        <ion-button expand="full" @click="handleLikedRecipesClick">Receitas favoritas</ion-button>
        <Modal text-close="Fechar" v-if="openLikedRecipesModal" title="Receitas Favoritas" @onDismiss="openLikedRecipesModal = false" >
          <ion-content fullscreen>
            <LikedRecipesList :recipeList="likedRecipes" @click="handleItemClicked"></LikedRecipesList>
          </ion-content>
        </Modal>
        <Modal text-close="Voltar" v-if="selectedRecipe" title="Detalhes da receita" @onDismiss="closeModalRecipe" >
          <Recipe :recipeId="selectedRecipe" />
        </Modal>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonCard } from '@ionic/vue';
import { logOutOutline } from 'ionicons/icons';
import { computed, defineComponent, ref } from 'vue'
import { AuthCard } from '@/components/Auth'
import { useStore } from "vuex"
import { ProgressBar, Message, Modal } from "@/components/Common"
import { ProfileCard } from "@/components/Profile"
import { userService } from '@/services';
import { LikedRecipesList, Recipe } from '@/components/Recipes';

export default defineComponent({
  name: 'Profile',
  components: { 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonPage,
    AuthCard,
    IonButtons, 
    IonButton, 
    IonIcon, 
    IonCard,
    ProgressBar,
    ProfileCard,
    Message,
    Modal,
    LikedRecipesList, 
    Recipe
  },
  setup() {
    const store = useStore()
    const userIsLogged = computed(() => store.getters.isTheUserLoggedIn)
    const isProgress = ref(false)
    const configMessage = ref({
        responseIsSuccessful: false,
        returnMessage: "",
        showMessage: false
    })
    const openLikedRecipesModal = ref<boolean>(false)
    const likedRecipes = ref<any>([])
    const selectedRecipe = ref<number>()

    const handleLikedRecipesClick = async () => {
      const response: any = await userService.getLikedRecipes(store.getters.getToken)
      likedRecipes.value = response.data.data

      if(likedRecipes.value.length == 0) {
        configMessage.value.showMessage = true
        configMessage.value.responseIsSuccessful = false
        configMessage.value.returnMessage = "Você ainda não possui nenhuma receita favorita"
      }
      else {
        openLikedRecipesModal.value = true
      }
    }

    const closeModalRecipe = () => {
      selectedRecipe.value = undefined
    }
    
    const handleItemClicked = (id) => {
      selectedRecipe.value = id
    }

    const handleEnd = (config) => {
      configMessage.value.showMessage = config.showMessage
      configMessage.value.responseIsSuccessful = config.responseIsSuccessful
      configMessage.value.returnMessage = config.returnMessage
    }

    const handleDismiss = () => {
      configMessage.value.showMessage = false
      configMessage.value.responseIsSuccessful = false
      configMessage.value.returnMessage = ""
    }

    const logout = () => {
      store.commit("removeUser")
    }

    const changeProgress = (value) => isProgress.value = value

    return {
      handleEnd,
      logout,
      changeProgress,
      handleDismiss,
      handleLikedRecipesClick,
      handleItemClicked,
      closeModalRecipe,
      userIsLogged,
      logOutOutline,
      isProgress,
      configMessage,
      openLikedRecipesModal,
      likedRecipes,
      selectedRecipe
    }
  }
})
</script>