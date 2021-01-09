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
        <!-- INICIO COMPONENTE INGREDIENTE -->
        <IngredientSearch v-for="(item, key) in (arrayIgredients)" 
          v-bind:key="key" 
          @action="(action) => handleClick(action, key)" 
          :color="item.color" 
          v-model="item.value" 
          :icon="item.icon" 
        />
        <ion-row>
          <ion-col size="2"></ion-col>
          <ion-col size="8">
            <ion-button expand="block">Buscar</ion-button>
          </ion-col>
        </ion-row>
        <!-- FIM COMPONENTE INGREDIENTE -->
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { addOutline, trashOutline } from 'ionicons/icons';
import IngredientSearch from '@/components/IngredientSearch.vue';
import { ref } from 'vue';

export default  {
  name: 'Search',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IngredientSearch },
  setup() {
    const arrayIgredients = ref([{
      color: "primary",
      icon: addOutline,
      value: ""
    }])

    const handleClick = (value: string, key: any) => {
      if(value == "add") {
        arrayIgredients.value.unshift({
          color: "danger",
          icon: trashOutline,
          value: ""
        })
      }
      if(value == "delete") {
        arrayIgredients.value.splice(key, 1)
      }
    }
    return {
      arrayIgredients,
      handleClick
    }
  }
}
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