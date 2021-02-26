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

      <Message 
        @onDismiss="configMessage.showMessage = false" 
        :show="configMessage.showMessage" 
        :isSuccess="configMessage.responseIsSuccessful" 
        :message="configMessage.returnMessage" 
      />
    
      <div>
        <AuthCard 
          v-if="!userIsLogged" 
          @progress="changeProgress" 
          @onAuthentication="handleAuthentication"
        />
        <RecipeForm v-if="userIsLogged" @loading="changeProgress" @end="handleEnd" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { AuthCard } from '@/components/Auth'
import { ProgressBar, Message } from "@/components/Common"
import { RecipeForm } from "@/components/RecipeForm"
import { ref, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'RecipeRegister',
  components: { 
    IonHeader, IonToolbar, IonTitle, IonContent, IonPage, 
    AuthCard, ProgressBar, Message, RecipeForm 
  },
  setup() {
    const store = useStore()
    const userIsLogged = ref(store.getters.isTheUserLoggedIn)
    const isProgress = ref(false)
    const configMessage = ref({
      showMessage: false,
      responseIsSuccessful: false, 
      returnMessage: ""
    })
    const handleAuthentication = () => {
      userIsLogged.value = true
    }

    const changeProgress = (value: boolean) => isProgress.value = value

    const handleEnd = (config) => configMessage.value = config

    return {
      handleEnd,
      handleAuthentication,
      changeProgress,
      userIsLogged,
      isProgress,
      configMessage
    }
  }
})
</script>