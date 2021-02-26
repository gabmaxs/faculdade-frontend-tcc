<template>
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
</template>

<script lang="ts">
import { userService } from '@/services';
import { IonList, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption } from '@ionic/vue';
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex';
import { User } from '@/models'

export default  defineComponent({
    name: "ProfileCard",
    components: {
        IonList, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption
    },
    setup() {
        const store = useStore()
        const user = ref<User>()

        const handleSuccess = ({data}) => {
            data.culinary_level = data.culinary_level.toString()
            user.value = data
        }

        const onInit = async () => {
            try {
                const token = store.getters.getToken
                const response = await userService.getProfile(token)
                handleSuccess(response.data)
            }
            catch(e) {
                console.log(e)
            }
        }

        onInit()

        return {
            user
        }
    }
})
</script>