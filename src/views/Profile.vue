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
    
      <div class="container">
        <AuthCard 
          v-if="!userIsLogged" 
          @progress="changeProgress" 
          @end="handleEnd"
        />
      </div>
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
      configMessage.value = config
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