<template>
  <v-app>
    <AppHeader />
    
    <SecondaryHeader />
    
    <v-main>
      <v-container fluid class="pa-2 pa-md-4" style="margin-top: 104px;">
        <slot />
      </v-container>
    </v-main>
    
    <AppFooter />
  </v-app>
</template>

<script>
import AppHeader from '../common/Header.vue'
import SecondaryHeader from '../common/SecondaryHeader.vue'
import AppFooter from '../common/Footer.vue'

export default {
  name: 'DefaultLayout',
  components: {
    AppHeader,
    SecondaryHeader,
    AppFooter
  }
}
</script>