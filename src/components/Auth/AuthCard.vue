<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title>{{ isLoginCard ? 'Entrar' : 'Registrar' }}</ion-card-title>
        </ion-card-header>

        <ion-card-content>
            <AuthCardLogin v-if="isLoginCard" @wantChange="isLoginCard = false" @wantLogin="login" />
            <AuthCardRegister v-if="!isLoginCard" @wantChange="isLoginCard = true" @wantRegister="register" />
        </ion-card-content>

        <Message @onDismiss="showMessage = false" :show="showMessage" :isSuccess="responseIsSuccessful" :message="returnMessage" />
    </ion-card> 
</template>

<script lang="ts">
import { userService } from '@/services';
import { IonCard, IonCardHeader, IonCardContent, IonCardTitle } from '@ionic/vue';
import { defineComponent, ref } from 'vue'
import AuthCardLogin from "./AuthCardLogin.vue"
import AuthCardRegister from "./AuthCardRegister.vue"
import { Message } from "@/components/Message"

export default defineComponent({
    name: 'AuthCard',
    components: { 
        IonCard, IonCardHeader, IonCardContent, IonCardTitle, AuthCardLogin, AuthCardRegister, Message
    },
    emits: ["onAuthentication", "progress"],
    setup(_, context) {
        const isLoginCard = ref(true)

        const responseIsSuccessful = ref(false)
        const returnMessage = ref("")
        const showMessage = ref(false)

        const handleUserLogged = ({message}: {message: string}) => {
            returnMessage.value = message
            responseIsSuccessful.value = true
            showMessage.value = true
            context.emit("onAuthentication", true)
        }

        const handleError = ({data, message}: {data: Array<any>; message: string}) => {
            returnMessage.value = message
            responseIsSuccessful.value = false
            showMessage.value = true
        }

        const login = async (user: any) => {
            context.emit("progress", true)
            try {
                const response = await userService.login(user)
                if(response.status === 200) await handleUserLogged(response.data)
            }
            catch(e) {
                handleError(e)
            }
            context.emit("progress", false)
        }

        const register = async (user: any) => {
            context.emit("progress", true)
            try{
                const response = await userService.register(user)
                if(response.status === 201) await handleUserLogged(response.data)
            }
            catch(e) {
                handleError(e)
            }
            context.emit("progress", false)
        }

        return {
            login,
            register,
            isLoginCard,
            responseIsSuccessful,
            returnMessage,
            showMessage
        }
    }
})
</script>