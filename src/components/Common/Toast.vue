<template>
    <div></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { toastController } from "@ionic/vue"
export default defineComponent({
    name: "Toast",
    props: [
        "message"
    ],
    emits: [
        "dismiss"
    ],
    setup(props,context) {
        const openToast = async () => {
            const toast = await toastController.create({
                message: props.message,
                duration: 2000
            })

            await toast.present()

            await toast.onDidDismiss()
            context.emit("dismiss", true)
        }

        onMounted(() => openToast())
    }
})
</script>