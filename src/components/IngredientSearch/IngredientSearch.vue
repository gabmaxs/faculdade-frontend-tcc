<template>
    <div>
        <IngredientSearchOptions />
        <IngredientList @change="updateIngredientList" />
        <IngredientSearchSubmit @click="handleSubmit" />

        <Message @onDismiss="showMessage = false" :show="showMessage" :isSuccess="responseIsSuccessful" :message="returnMessage" />
    </div>
</template>

<script lang="ts">
import IngredientSearchSubmit from "./IngredientSearchSubmit.vue"
import IngredientSearchOptions from "./IngredientSearchOptions.vue"
import IngredientList from "../Ingredient/IngredientList.vue"
import { defineComponent, ref } from 'vue'
import { recipeService } from "@/services"
import { Message } from "@/components/Common"

export default defineComponent({
  name: 'IngredientSearch',
  components: { IngredientList, IngredientSearchSubmit, IngredientSearchOptions, Message },
  emits: [
    "progress", "success"
  ],
  setup(_, context) { 
    const ingredients = ref([""])
    const responseIsSuccessful = ref(false)
    const returnMessage = ref("")
    const showMessage = ref(false)

    const handleSuccess = ({data, message}: {data: Array<any>; message: string}) => {
      returnMessage.value = message
      responseIsSuccessful.value = true
      showMessage.value = true
      context.emit("success", data)
    }

    const handleError = ({data, message}: {data: Array<any>; message: string}) => {
      returnMessage.value = message
      responseIsSuccessful.value = false
      showMessage.value = true
      console.log(data, message)
    }

    const updateIngredientList = (list) => ingredients.value = list

    const handleSubmit = async () => {
      context.emit("progress", true)
      try {
        const response = await recipeService.searchRecipes(ingredients.value)
        await handleSuccess(response.data)
      }
      catch(e) {
        handleError(e)
      }
      context.emit("progress", false)
    }

    return {
      updateIngredientList,
      handleSubmit,
      responseIsSuccessful,
      returnMessage,
      showMessage
    }
  }
});
</script>