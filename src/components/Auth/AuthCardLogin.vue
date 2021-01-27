<template>
    <ion-grid>
        <ion-row class="ion-align-items-center">
            <ion-col size="12">
                <ion-item>
                    <ion-label position="floating">E-mail</ion-label>
                    <ion-input v-model="user.email" type="email"></ion-input>
                </ion-item>
            </ion-col>
        </ion-row>
        <ion-row class="ion-align-items-center">
            <ion-col size="12">
                <ion-item>
                    <ion-label position="floating">Senha</ion-label>
                    <ion-input v-model="user.password" type="password"></ion-input>
                </ion-item>
            </ion-col>
        </ion-row>
        <ion-row>
            <a @click="changeToRegister">Efetuar cadastro</a>
        </ion-row>
        <ion-row>
            <ion-col size="8" offset="2">
                <ion-button @click="login" expand="block">Entrar</ion-button>
            </ion-col>
        </ion-row>
    </ion-grid>
</template>

<script lang="ts">
import {  IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonButton } from "@ionic/vue"
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'AuthCardLogin',
    components: { 
        IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonButton 
    },
    emits: ["wantChange", "wantLogin"],
    setup(_,context) {
        const user = ref({
            email: '',
            password: ''
        })

        const changeToRegister = () => {
            context.emit("wantChange", true)
        }

        const login = () => {
            context.emit("wantLogin", user.value)
        }

        return {
            changeToRegister,
            login,
            user
        }
    }
})
</script>

<style scoped>
a {
    margin-left: 5px;
    margin-top: 3px;
}
</style>