<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title>{{ isLoginCard ? 'Entrar' : 'Registrar' }}</ion-card-title>
        </ion-card-header>

        <ion-card-content>
            <AuthCardLogin v-if="isLoginCard" @wantChange="isLoginCard = false" />
            <AuthCardRegister v-if="!isLoginCard" @wantChange="isLoginCard = true" />
        </ion-card-content>
    </ion-card> 
</template>

<script lang="ts">
import { IonCard, IonCardHeader, IonCardContent, IonCardTitle } from '@ionic/vue';
import { defineComponent, ref } from 'vue'
import AuthCardLogin from "./AuthCardLogin.vue"
import AuthCardRegister from "./AuthCardRegister.vue"

export default defineComponent({
    name: 'AuthCard',
    components: { 
        IonCard, IonCardHeader, IonCardContent, IonCardTitle, AuthCardLogin, AuthCardRegister
    },
    setup() {
        const isLoginCard = ref(true)

        return {
            isLoginCard
        }
    }
})
</script>