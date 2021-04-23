<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title>Editar informações</ion-card-title>
        </ion-card-header>
        <ion-card-content>
            <ion-list v-if="user">
                <ion-item>
                    <ion-label position="floating">Nome</ion-label>
                    <ion-input v-model="user.name" type="text"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label position="floating">E-mail</ion-label>
                    <ion-input v-model="user.email" type="email"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label position="floating">Gênero</ion-label>
                    <ion-select interface="action-sheet" v-model="user.gender">
                        <ion-select-option value="F">Feminino</ion-select-option>
                        <ion-select-option value="M">Masculino</ion-select-option>
                    </ion-select>
                </ion-item>
                <ion-item>
                    <ion-label position="floating">Nível Culinário</ion-label>
                    <ion-select interface="action-sheet" v-model="user.culinary_level">
                        <ion-select-option value="1">Pesadelo na cozinha</ion-select-option>
                        <ion-select-option value="2">Sei me virar</ion-select-option>
                        <ion-select-option value="3">Consigo me alimentar</ion-select-option>
                        <ion-select-option value="4">Cozinho para todo mundo</ion-select-option>
                        <ion-select-option value="5">Chef</ion-select-option>
                    </ion-select>
                </ion-item>
            </ion-list>
        </ion-card-content>
        <ion-row>
          <ion-col size="8" offset="2">
            <ion-button @click="saveProfile" expand="block">Salvar</ion-button>
          </ion-col>
        </ion-row>
    </ion-card>
</template>

<script lang="ts">
import { userService } from '@/services';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCol, IonRow, 
    IonList, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton 
} from '@ionic/vue';
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex';
import { User } from '@/models'

export default  defineComponent({
    name: "ProfileCard",
    components: {
        IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCol, IonRow, 
        IonList, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton
    },
    emits: [
        "progress", "end"
    ],
    setup(_, context) {
        const store = useStore()
        const user = ref<User>()
        const messageConfig = {
            responseIsSuccessful: false,
            returnMessage: "",
            showMessage: false
        }

        const setUser = (data) => {
            data.culinary_level = data.culinary_level.toString()
            user.value = data
        }

        const handleSuccess = ({data, message}: {data: Array<any>; message: string}) => {
            messageConfig.returnMessage = message
            messageConfig.responseIsSuccessful = true
            messageConfig.showMessage = true
            context.emit("progress", false)
            context.emit("end", messageConfig)
            setUser(data)
        }

        const handleError = ({message}: {message: string}) => {
            messageConfig.returnMessage = message
            messageConfig.responseIsSuccessful = false
            messageConfig.showMessage = true
            context.emit("progress", false)
            context.emit("end", messageConfig)
        }

        const onInit = async () => {
            try {
                const token = store.getters.getToken
                const response = await userService.getProfile(token)
                handleSuccess(response.data)
            }
            catch(e) {
                handleError(e.response)
            }
        }

        const saveProfile = async () => {
            try {
                context.emit("progress", true)
                const token = store.getters.getToken
                const response = await userService.saveProfile(user.value, token)
                handleSuccess(response.data)
            }
            catch(e) {
                console.log(e)
                handleError(e.response)
            }
        }

        onInit()

        return {
            saveProfile,
            user
        }
    }
})
</script>