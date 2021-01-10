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
        <IngredientSearch />
        <!-- FIM COMPONENTE INGREDIENTE -->
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import IngredientSearch from '@/components/IngredientSearch/IngredientSearch.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Search',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IngredientSearch },
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