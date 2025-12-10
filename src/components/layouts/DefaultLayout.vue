<template>
  <v-app>
    <AppHeader />
    
    <v-main>
      <v-container fluid class="pa-0">
        <slot />
      </v-container>
    </v-main>
    
    <AppFooter />
  </v-app>
</template>

<script>
import AppHeader from '../common/Header.vue'
import AppFooter from '../common/Footer.vue'

export default {
  name: 'DefaultLayout',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>