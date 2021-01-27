<template>
    <ion-grid>
        <ion-row class="ion-align-items-center">
            <ion-col size="12">
                <ion-item>
                    <ion-label position="floating">Nome</ion-label>
                    <ion-input type="text"></ion-input>
                </ion-item>
            </ion-col>
        </ion-row>
        <ion-row class="ion-align-items-center">
            <ion-col size="12">
                <ion-item>
                    <ion-label position="floating">E-mail</ion-label>
                    <ion-input type="email"></ion-input>
                </ion-item>
            </ion-col>
        </ion-row>
        <ion-row class="ion-align-items-center">
            <ion-col size="12">
                <ion-item>
                    <ion-label position="floating">Senha</ion-label>
                    <ion-input type="password"></ion-input>
                </ion-item>
            </ion-col>
        </ion-row>
        <ion-row class="ion-align-items-center">
            <ion-col size="12">
                <ion-item>
                    <ion-label position="floating">Confirmar Senha</ion-label>
                    <ion-input type="password"></ion-input>
                </ion-item>
            </ion-col>
        </ion-row>
        <ion-row>
            <a @click="changeToRegister">Ja posui cadastro?</a>
        </ion-row>
        <ion-row>
            <ion-col size="8" offset="2">
                <ion-button expand="block">Registrar</ion-button>
            </ion-col>
        </ion-row>
    </ion-grid>
</template>

<script lang="ts">
import {  IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonButton } from "@ionic/vue"
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'AuthCardRegister',
    components: { 
        IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonButton 
    },
    emits: ["wantChange"],
    setup(_,context) {
        const changeToRegister = () => {
            context.emit("wantChange", true)
        }

        return {
            changeToRegister
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