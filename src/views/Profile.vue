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
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Perfil</ion-title>
          <ion-buttons v-if="userIsLogged" slot="end">
            <ion-button @click="logout"><ion-icon :icon="logOutOutline"></ion-icon></ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      
      <div class="container">
        <AuthCard v-if="!userIsLogged" @progress="changeProgress" @onAuthentication="handleAuthentication"/>
        <div v-if="userIsLogged">
          <h1>User esta logado</h1>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon } from '@ionic/vue';
import { logOutOutline } from 'ionicons/icons';
import { defineComponent, ref } from 'vue'
import { AuthCard } from '@/components/Auth'
import { useStore } from "vuex"
import { ProgressBar } from "@/components/Common"

export default  defineComponent({
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
    ProgressBar
  },
  setup() {
    const store = useStore()
    const userIsLogged = ref(store.getters.isTheUserLoggedIn)
    const isProgress = ref(false)

    const handleAuthentication = () => {
      userIsLogged.value = true
    }

    const logout = () => {
      store.commit("removeUser")
      userIsLogged.value = false
    }

    const changeProgress = (value) => isProgress.value = value

    return {
      handleAuthentication,
      logout,
      changeProgress,
      userIsLogged,
      logOutOutline,
      isProgress
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