<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title>{{ isLoginCard ? 'Entrar' : 'Registrar' }}</ion-card-title>
        </ion-card-header>

        <ion-card-content>
            <AuthCardLogin v-if="isLoginCard" @wantChange="isLoginCard = false" @wantLogin="login" />
            <AuthCardRegister v-if="!isLoginCard" @wantChange="isLoginCard = true" />
        </ion-card-content>
    </ion-card> 
</template>

<script lang="ts">
import { userService } from '@/services';
import { IonCard, IonCardHeader, IonCardContent, IonCardTitle } from '@ionic/vue';
import { defineComponent, ref } from 'vue'
import AuthCardLogin from "./AuthCardLogin.vue"
import AuthCardRegister from "./AuthCardRegister.vue"

export default defineComponent({
    name: 'AuthCard',
    components: { 
        IonCard, IonCardHeader, IonCardContent, IonCardTitle, AuthCardLogin, AuthCardRegister
    },
    emits: ["onAuthentication"],
    setup(_, context) {
        const isLoginCard = ref(true)

        const handleUserLogged = () => {
            console.log("usuario esta logado")
            context.emit("onAuthentication", true)
        }

        const login = async (user: any) => {
            const response = await userService.login(user)
            if(response.status === 200) handleUserLogged()
            console.log(response)
        }

        return {
            isLoginCard,
            login
        }
    }
})
</script>