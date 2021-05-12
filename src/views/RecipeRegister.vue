<template>
  <ion-page>
    <ion-header>
      <ProgressBar v-if="isProgress" />
      <ion-toolbar>
        <ion-title>Cadastrar Receita</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">

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
          @end="handleEndAuth"
        />
        <RecipeForm v-if="userIsLogged" @loading="changeProgress" @end="handleEndForm" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { AuthCard } from '@/components/Auth'
import { ProgressBar, Message } from "@/components/Common"
import { RecipeForm } from "@/components/RecipeForm"
import { ref, defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'RecipeRegister',
  components: { 
    IonHeader, IonToolbar, IonTitle, IonContent, IonPage, 
    AuthCard, ProgressBar, Message, RecipeForm 
  },
  setup() {
    const store = useStore()
    const userIsLogged = computed(() => store.getters.isTheUserLoggedIn)
    const isProgress = ref(false)
    const configMessage = ref({
      showMessage: false,
      responseIsSuccessful: false, 
      returnMessage: ""
    })
    const handleEndAuth = (config) => {
      configMessage.value = config
    }

    const changeProgress = (value: boolean) => isProgress.value = value

    const handleEndForm = (config) => {
      configMessage.value = config
    }

    return {
      handleEndForm,
      handleEndAuth,
      changeProgress,
      userIsLogged,
      isProgress,
      configMessage
    }
  }
})
</script>