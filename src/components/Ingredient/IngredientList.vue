<template>
    <div>
        <IngredientInput v-for="item in (arrayIngredients)" 
          v-bind:key="item.uuid" 
          @action="(action) => handleAction(action, item.uuid)"  
          v-model="item.name"
          @update:modelValue = "() => emitUpdate()"
          :has-config = hasConfig
          v-model:quantity="item.quantity"
          v-model:measure="item.measure"
          @update:quantity = "() => emitUpdate()"
          @update:measure = "() => emitUpdate()"
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
    emits: ["change"],
    props: {
        hasConfig: {
            type: Boolean,
            default: false
        }
    },
    setup(props, context) {
        const arrayIngredients = ref([{name:"", quantity: null, measure: '', uuid: uuidv4()}])

        const emitNoConfig = () => {
            const ingredients = arrayIngredients.value.map((item) => item.name)
            context.emit("change", ingredients)
        }

        const emitConfig = () => {
            context.emit("change", arrayIngredients.value)
        }

        const emitUpdate = () => {
            if(!props.hasConfig) emitNoConfig()
            else emitConfig()
        }

        const handleAction = (value: string, key: string) => {
            if(value == "add")  arrayIngredients.value.push({name:"", quantity: null, measure: '', uuid: uuidv4()})
            if(value == "delete") arrayIngredients.value = arrayIngredients.value.filter(item => item.uuid != key)

            emitUpdate()
        }

        return {
            handleAction,
            emitUpdate,
            arrayIngredients
        }
    },
})
</script>
