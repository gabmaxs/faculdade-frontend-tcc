<template>
    <div>
        <Toast 
          :message="message" 
          @dismiss="handleDismiss"
          :show="show"
          v-if="isSuccess && show" 
        />

        <Alert 
          :message="message" 
          v-if="!isSuccess && show" 
          @dismiss="handleDismiss"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Toast, Alert } from "@/components/Common"

export default defineComponent({
    name: "Message",
    components: {
        Toast, Alert
    },
    emits: ["dismiss"],
    props: {
        isSuccess: {
            type: Boolean,
            required: true
        },
        show: {
            type: Boolean,
            required: true
        },
        message: {
            type: String,
            required: true
        }
    },
    setup(_, context) {
        const handleDismiss = () => context.emit("dismiss")

        return {
            handleDismiss
        }
    }
})
</script>