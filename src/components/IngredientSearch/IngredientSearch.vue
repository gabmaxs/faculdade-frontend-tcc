<template>
    <div>
        <IngredientSearchOptions />
        <IngredientSearchInput v-for="item in (arrayIngredients)" 
          v-bind:key="item.uuid" 
          @action="(action) => handleAction(action, item.uuid)"  
          v-model="item.value" 
        />
        <IngredientSearchSubmit @click="handleSubmit" />

        <Message @onDismiss="showMessage = false" :show="showMessage" :isSuccess="responseIsSuccessful" :message="returnMessage" />
    </div>
</template>

<script lang="ts">
import IngredientSearchInput from "./IngredientSearchInput.vue"
import IngredientSearchSubmit from "./IngredientSearchSubmit.vue"
import IngredientSearchOptions from "./IngredientSearchOptions.vue"
import { defineComponent, ref } from 'vue'
import { recipeService } from "@/services"
import { Message } from "@/components/Common"
import { v4 as uuidv4 } from 'uuid'

export default defineComponent({
  name: 'IngredientSearch',
  components: { IngredientSearchInput, IngredientSearchSubmit, IngredientSearchOptions, Message },
  emits: [
    "progress", "success"
  ],
  setup(_, context) { 
    const arrayIngredients = ref([{value:"", uuid: uuidv4()}])

    const responseIsSuccessful = ref(false)
    const returnMessage = ref("")
    const showMessage = ref(false)

    const handleAction = (value: string, key: string) => {
      if(value == "add")  arrayIngredients.value.push({value:"", uuid: uuidv4()})
      if(value == "delete") arrayIngredients.value = arrayIngredients.value.filter(item => item.uuid != key)
    }

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
      handleAction,
      handleSubmit,
      arrayIngredients,
      responseIsSuccessful,
      returnMessage,
      showMessage
    }
  }
});
</script>