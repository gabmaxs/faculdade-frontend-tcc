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
    </div>
</template>

<script lang="ts">
import IngredientSearchInput from "./IngredientSearchInput.vue"
import IngredientSearchSubmit from "./IngredientSearchSubmit.vue"
import { addOutline, trashOutline } from 'ionicons/icons';
import { defineComponent, ref } from 'vue'
import axios from 'axios'

export default defineComponent({
  name: 'IngredientSearch',
  components: { IngredientSearchInput, IngredientSearchSubmit },
  props: {
  },
  setup() { 
    const arrayIgredients = ref([{
      color: "primary",
      icon: addOutline,
      value: ""
    }])

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

    const handleSubmit = () => {
      const ingredients = arrayIgredients.value.map((item) => item.value)
      axios.get("http://tcc.test/api/recipe", {
        params: {
          ingredients: ingredients
        },
        headers: {
          Accept: "application/json"
        }
      })
      .then(response => console.log(response, response.data.args))
      .catch(({response}) => console.log(response))
    }
    return {
      arrayIgredients,
      handleAction,
      handleSubmit
    }
  }
});
</script>