<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Perfil</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Perfil</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <div class="container">
        <AuthCard v-if="!userIsLogged" @onAuthentication="handleAuthentication"/>
        <div v-if="userIsLogged">
          <h1>User esta logado</h1>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { defineComponent, ref } from 'vue'
import { AuthCard } from '@/components/Auth'
import { useStore } from "vuex"

export default  defineComponent({
  name: 'Profile',
  components: { 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonPage,
    AuthCard
  },
  setup() {
    const store = useStore()
    const userIsLogged = ref(store.getters.isTheUserLoggedIn)
    const handleAuthentication = () => {
      console.log("sei que user esta logado")
      userIsLogged.value = true
    }

    return {
      handleAuthentication,
      userIsLogged
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