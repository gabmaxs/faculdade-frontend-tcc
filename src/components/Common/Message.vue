<template>
    <div v-if="show">
        <Toast 
          :message="message" 
          v-if="isSuccess" 
          @dismiss="dismiss"
        />

        <Alert 
          :message="message" 
          v-if="!isSuccess" 
          @dismiss="dismiss"
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
        const dismiss = () => {
            context.emit("dismiss", true)
        }

        return {
            dismiss
        }
    }
})
</script>