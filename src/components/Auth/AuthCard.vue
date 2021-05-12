<template>
    <div class="container">
        <ion-card>
            <ion-card-header>
                <ion-card-title>{{ isLoginCard ? 'Entrar' : 'Registrar' }}</ion-card-title>
            </ion-card-header>

            <ion-card-content>
                <AuthCardLogin 
                    v-if="isLoginCard" 
                    @wantChange="isLoginCard = false" 
                    @wantLogin="login" 
                />
                <AuthCardRegister 
                    v-if="!isLoginCard" 
                    @wantChange="isLoginCard = true" 
                    @wantRegister="register" 
                />
            </ion-card-content>
        </ion-card> 
    </div>
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
        IonCard, IonCardHeader, IonCardContent, IonCardTitle, 
        AuthCardLogin, AuthCardRegister
    },
    emits: ["end", "progress"],
    setup(_, context) {
        const isLoginCard = ref(true)

        const handleUserLogged = ({message}: {message: string}) => {
            const data = {
                returnMessage: message,
                responseIsSuccessful: true,
                showMessage: true
            }
            context.emit("end", data)
        }

        const handleError = ({message}: {message: string}) => {
            const data = {
                returnMessage: message,
                responseIsSuccessful: false,
                showMessage: true
            }
            context.emit("end", data)
        }

        const login = async (user: any) => {
            context.emit("progress", true)
            try {
                const response = await userService.login(user)
                if(response.status === 200) await handleUserLogged(response.data)
            }
            catch(e) {
                handleError(e.response.data || e)
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
                handleError(e.response.data || e)
            }
            context.emit("progress", false)
        }

        return {
            login,
            register,
            isLoginCard
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