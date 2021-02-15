<template>
  <ion-page>
    <ion-header>
      <ProgressBar v-if="isProgress" />
      <ion-toolbar>
        <ion-title>Cadastrar Receita</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Cadastrar Receita</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <div>
        <AuthCard v-if="!userIsLogged" @progress="changeProgress" @onAuthentication="handleAuthentication"/>
        <RecipeForm v-if="userIsLogged" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { AuthCard } from '@/components/Auth'
import { ProgressBar } from "@/components/Common"
import { RecipeForm } from "@/components/RecipeForm"
import { ref, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'RecipeRegister',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, AuthCard, ProgressBar, RecipeForm },
  setup() {
    const store = useStore()
    const userIsLogged = ref(store.getters.isTheUserLoggedIn)
    const isProgress = ref(false)

    const handleAuthentication = () => {
      userIsLogged.value = true
    }

    const changeProgress = (value) => isProgress.value = value

    return {
      handleAuthentication,
      changeProgress,
      userIsLogged,
      isProgress
    }
  }
})
</script>