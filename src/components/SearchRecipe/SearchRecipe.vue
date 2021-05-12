<template>
    <div>
        <SearchRecipeOptions v-model="options" />
        <IngredientList v-model="arrayIngredients"/>
        <SearchRecipeSubmit @click="handleSubmit" />

        <Message @onDismiss="showMessage = false" :show="showMessage" :isSuccess="responseIsSuccessful" :message="returnMessage" />
    </div>
</template>

<script lang="ts">
import SearchRecipeSubmit from "./SearchRecipeSubmit.vue"
import SearchRecipeOptions from "./SearchRecipeOptions.vue"
import IngredientList from "../Ingredient/IngredientList.vue"
import { defineComponent, ref } from 'vue'
import { recipeService } from "@/services"
import { Message } from "@/components/Common"
import { useStore } from "vuex"

export default defineComponent({
  name: 'SearchRecipe',
  components: { IngredientList, SearchRecipeSubmit, SearchRecipeOptions, Message },
  emits: [
    "progress", "success"
  ],
  setup(_, context) { 
    const responseIsSuccessful = ref(false)
    const returnMessage = ref("")
    const showMessage = ref(false)
    const store = useStore()
    const arrayIngredients = ref(store.getters.getList)
    const options = ref(store.getters.getOptions)

    const handleSuccess = ({data, message}: {data: Array<any>; message: string}) => {
      returnMessage.value = message
      responseIsSuccessful.value = true
      showMessage.value = true
      context.emit("success", data)
    }

    const handleError = ({message}: {message: string}) => {
      returnMessage.value = message
      responseIsSuccessful.value = false
      showMessage.value = true
    }

    const handleSubmit = async () => {
      context.emit("progress", true)
      store.commit("setList", arrayIngredients.value)
      store.commit("setOptions", options.value)
      const ingredients = arrayIngredients.value.map((item) => item.name)
      try {
        const response = await recipeService.searchRecipes(ingredients, options.value)
        await handleSuccess(response.data)
      }
      catch(e) {
        handleError(e.response.data || e)
      }
      context.emit("progress", false)
    }

    return {
      handleSubmit,
      options,
      responseIsSuccessful,
      returnMessage,
      showMessage,
      arrayIngredients
    }
  }
});
</script>