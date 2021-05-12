<template>
    <div>
        <ion-modal
            :is-open="isOpen"
            @onDidDismiss="handleDismiss"
        >
            <ion-page>
            <!-- INICIO CONTENT MODAL -->
                <ion-header>
                    <ProgressBar v-if="isProgress" />
                    <ion-toolbar>
                        <ion-title>{{ title }}</ion-title>
                        <ion-buttons slot="end">
                            <ion-button @click="dismissModal">{{ textClose || 'Cancelar' }}</ion-button>
                        </ion-buttons>
                    </ion-toolbar>
                </ion-header>
                <ion-content :fullscreen="true">
                
                    <div class="container">
                        <!-- COMPONENT ENTRA AQUI -->
                        <slot></slot>
                    </div>
                </ion-content>
            <!-- FIM CONTENT MODAL -->
            </ion-page>
        </ion-modal>
    </div>
</template>

<script lang="ts">
import { IonModal, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { ProgressBar } from "@/components/Common"

export default defineComponent({
    name: "Modal",
    components: { IonModal, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, ProgressBar },
    props: ["title", "is-progress", "text-close"],
    emit: [],
    setup(props,context) {
        const handleDismiss = () => context.emit("onDismiss", true)

        const isOpen = ref(true)

        const dismissModal = () => isOpen.value = false

        return { handleDismiss, isOpen, dismissModal, ProgressBar }
    }
})
</script>