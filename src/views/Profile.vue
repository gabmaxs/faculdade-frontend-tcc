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
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon } from '@ionic/vue';
import { logOutOutline } from 'ionicons/icons';
import { computed, defineComponent, ref } from 'vue'
import { AuthCard } from '@/components/Auth'
import { useStore } from "vuex"
import { ProgressBar, Message } from "@/components/Common"
import { ProfileCard } from "@/components/Profile"

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
    ProgressBar,
    ProfileCard,
    Message
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
      userIsLogged,
      logOutOutline,
      isProgress,
      configMessage
    }
  }
})
</script>