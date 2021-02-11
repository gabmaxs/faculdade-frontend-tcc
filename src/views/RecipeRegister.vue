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
    
      <div class="container">
        <AuthCard v-if="!userIsLogged" @progress="changeProgress" @onAuthentication="handleAuthentication"/>
        <div v-if="userIsLogged">
          <h1>Cadastrar nova receita</h1>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { AuthCard } from '@/components/Auth'
import { ProgressBar } from "@/components/Common"
import { ref } from 'vue';
import { useStore } from 'vuex';

export default  {
  name: 'RecipeRegister',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, AuthCard, ProgressBar },
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
}
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