<template>
    <div>
        <IngredientSearchInput v-for="(item, key) in (arrayIngredients)" 
          v-bind:key="key" 
          @action="(action) => handleAction(action, key)"  
          v-model="item.value" 
        />
        <IngredientSearchSubmit @click="handleSubmit" />

        <Message @onDismiss="showMessage = false" :show="showMessage" :isSuccess="responseIsSuccessful" :message="returnMessage" />
    </div>
</template>

<script lang="ts">
import IngredientSearchInput from "./IngredientSearchInput.vue"
import IngredientSearchSubmit from "./IngredientSearchSubmit.vue"
import { defineComponent, ref } from 'vue'
import { recipeService } from "@/services"
import { Message } from "@/components/Message"

export default defineComponent({
  name: 'IngredientSearch',
  components: { IngredientSearchInput, IngredientSearchSubmit, Message },
  emits: [
    "progress", "success"
  ],
  setup(_, context) { 
    const arrayIngredients = ref([{value:""}])

    const responseIsSuccessful = ref(false)
    const returnMessage = ref("")
    const showMessage = ref(false)

    const handleAction = (value: string, key: any) => {
      if(value == "add")  arrayIngredients.value.push({value:""})
      if(value == "delete") arrayIngredients.value.splice(key, 1)
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