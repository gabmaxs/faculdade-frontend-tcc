<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Buscar receita</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Buscar receita</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <div class="container">
        <ion-button @click="openModal = true">Digitar Ingredientes</ion-button>
        <Modal :is-progress="isSendingRequest" title="Buscar Receita" @onDismiss="openModal = false" v-if="openModal">
          <IngredientSearch @success="handleSuccess" @progress="handleProgress" />
        </Modal>
        <RecipesList v-if="recipes.length > 0" :recipeList="recipes" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue'
import { IngredientSearch } from '@/components/IngredientSearch'
import { RecipesList } from '@/components/Recipes'
import { Modal } from '@/components/Common'
import { defineComponent, ref } from 'vue'
import { categoryService } from '@/services'

export default defineComponent({
  name: 'Search',
  components: { 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonPage, 
    IngredientSearch, 
    RecipesList,
    IonButton,
    Modal
  },
  setup() {
    const isSendingRequest = ref(false)
    const recipes = ref<any>([])
    const openModal = ref(true)

    const getCategoryName = async (id: number) => {
        const response = await categoryService.getCategoryById(id)
        return response.data.data.name
    }

    const getListWithCategory = (list: any) => {
      const newList = list.map( async (item: any) => {
          const name = await getCategoryName(item.id)
          return {
              ...item,
              categoryName: name
          }
      })

      return newList
    }

    const handleProgress = (state: any) => {
      console.log("progress")
      isSendingRequest.value = state
    }

    const handleSuccess = async (list: any) => {
      console.log("success")
      openModal.value = false
      const newList = await Promise.all(getListWithCategory(list))
      recipes.value = newList
    }

    return {
      handleProgress,
      isSendingRequest,
      handleSuccess,
      recipes,
      openModal
    }
  }
})
</script>

<style scoped>
.container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>