<template>
    <div>
        <IngredientInput v-for="item in (ingredients)" 
          v-bind:key="item.uuid" 
          @action="(action) => handleAction(action, item.uuid)"  
          v-model="item.name"
          :has-config = hasConfig
          v-model:quantity="item.quantity"
          v-model:measure="item.measure"
          v-model:dirty="item.dirty"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import IngredientInput from "@/components/Ingredient/IngredientInput.vue"
import { v4 as uuidv4 } from 'uuid'

export default defineComponent({
    name: "IngredientList",
    components: { IngredientInput },
    emits: ["update:modelValue"],
    props: {
        hasConfig: {
            type: Boolean,
            default: false
        },
        modelValue: {
            required: true,
            type: Array
        }
    },
    setup(props, context) {
        const ingredients = ref<any>(props.modelValue)

        const handleAction = (value: string, key: string) => {
            if(value == "add")  ingredients.value.push({name:"", quantity: null, measure: '', uuid: uuidv4(), dirty: false})
            if(value == "delete") ingredients.value = ingredients.value.filter(item => item.uuid != key)

            context.emit("update:modelValue", ingredients.value)
        }

        return {
            handleAction,
            ingredients
        }
    },
})
</script>
