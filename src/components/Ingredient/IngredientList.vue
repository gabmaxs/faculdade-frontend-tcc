<template>
    <div>
        <IngredientInput v-for="item in (arrayIngredients)" 
          v-bind:key="item.uuid" 
          @action="(action) => handleAction(action, item.uuid)"  
          v-model="item.name"
          @update:modelValue = "() => emitUpdate()"
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
    setup(props, context) {
        const arrayIngredients = ref([{name:"", uuid: uuidv4()}])

        const emitUpdate = () => {
            const ingredients = arrayIngredients.value.map((item) => item.name)
            context.emit("change", ingredients)
        }

        const handleAction = (value: string, key: string) => {
            if(value == "add")  arrayIngredients.value.push({name:"", uuid: uuidv4()})
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
