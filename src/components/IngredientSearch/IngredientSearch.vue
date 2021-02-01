<template>
    <div>
        <IngredientSearchInput v-for="(item, key) in (arrayIngredients)" 
          v-bind:key="key" 
          @action="(action) => handleAction(action, key)"  
          v-model="item.value" 
        />
        <IngredientSearchSubmit @click="handleSubmit" />
        
        <Toast 
          :message="returnMessage" 
          v-if="responseIsSuccessful" 
          @onDismiss="responseIsSuccessful = false" 
        />

        <Alert 
          :message="returnMessage" 
          v-if="responseIsNotSuccessful" 
          @onDismiss="responseIsNotSuccessful = false" 
        />
    </div>
</template>

<script lang="ts">
import IngredientSearchInput from "./IngredientSearchInput.vue"
import IngredientSearchSubmit from "./IngredientSearchSubmit.vue"
import { defineComponent, ref } from 'vue'
import { recipeService } from "@/services"
import { Toast, Alert } from "@/components/Common"

export default defineComponent({
  name: 'IngredientSearch',
  components: { IngredientSearchInput, IngredientSearchSubmit, Toast, Alert },
  emits: [
    "progress", "success"
  ],
  setup(_, context) { 
    const arrayIngredients = ref([{value:""}])

    const responseIsSuccessful = ref(false)
    const responseIsNotSuccessful = ref(false)
    const returnMessage = ref("")

    const handleAction = (value: string, key: any) => {
      if(value == "add")  arrayIngredients.value.push({value:""})
      if(value == "delete") arrayIngredients.value.splice(key, 1)
    }

    const handleSuccess = ({data, message}: {data: Array<any>; message: string}) => {
      responseIsSuccessful.value = true
      returnMessage.value = message
      context.emit("success", data)
    }

    const handleError = ({data, message}: {data: Array<any>; message: string}) => {
      responseIsNotSuccessful.value = true
      returnMessage.value = message
      console.log(data, message)
    }

    const handleSubmit = async () => {
      context.emit("progress", true)
      const ingredients = arrayIngredients.value.map((item) => item.value)
      try {
        const response = await recipeService.searchRecipes(ingredients)
        await handleSuccess(response.data)
      }
      catch(e) {
        handleError(e)
      }
      context.emit("progress", false)
    }

    return {
      arrayIngredients,
      handleAction,
      handleSubmit,
      responseIsSuccessful,
      responseIsNotSuccessful,
      returnMessage
    }
  }
});
</script>