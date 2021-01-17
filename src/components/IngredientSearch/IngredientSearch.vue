<template>
    <div>
        <IngredientSearchInput v-for="(item, key) in (arrayIgredients)" 
          v-bind:key="key" 
          @action="(action) => handleAction(action, key)" 
          :color="item.color" 
          v-model="item.value" 
          :icon="item.icon" 
        />
        <IngredientSearchSubmit @click="handleSubmit" />
        <Toast :message="returnMessage" v-if="responseIsSuccessful" @onDismiss="responseIsSuccessful = false" />
    </div>
</template>

<script lang="ts">
import IngredientSearchInput from "./IngredientSearchInput.vue"
import IngredientSearchSubmit from "./IngredientSearchSubmit.vue"
import { addOutline, trashOutline } from 'ionicons/icons';
import { defineComponent, ref } from 'vue'
import recipeService from "@/services"
import { Toast } from "@/components/Common"

export default defineComponent({
  name: 'IngredientSearch',
  components: { IngredientSearchInput, IngredientSearchSubmit, Toast },
  emits: [
    "progress"
  ],
  setup(_, context) { 
    const arrayIgredients = ref([{
      color: "primary",
      icon: addOutline,
      value: ""
    }])

    const responseIsSuccessful = ref(false)
    const returnMessage = ref("")

    const handleAction = (value: string, key: any) => {
      if(value == "add") {
        arrayIgredients.value[arrayIgredients.value.length-1].color = "danger"
        arrayIgredients.value[arrayIgredients.value.length-1].icon = trashOutline
        arrayIgredients.value.push({
          color: "primary",
          icon: addOutline,
          value: ""
        })
      }
      if(value == "delete") {
        arrayIgredients.value.splice(key, 1)
      }
    }

    const handleSuccess = ({data, message}: {data: Array<any>; message: string}) => {
      responseIsSuccessful.value = true
      returnMessage.value = message
    }

    const handleError = ({data, message}: {data: Array<any>; message: string}) => {
      console.log(data, status)
    }

    const handleSubmit = async () => {
      context.emit("progress", true)
      const ingredients = arrayIgredients.value.map((item) => item.value)
      const response = await recipeService.searchRecipes(ingredients)
      if(response.status === 200) handleSuccess(response.data)
      else handleError(response)
      context.emit("progress", false)
    }

    return {
      arrayIgredients,
      handleAction,
      handleSubmit,
      responseIsSuccessful,
      returnMessage
    }
  }
});
</script>