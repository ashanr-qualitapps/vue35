<template>
  <v-app>
    <AuthenticatedHeader 
      @toggle-drawer="drawer = !drawer"
      :drawer="drawer"
    />
    
    <SecondaryHeader :with-sidebar="drawer" :sidebar-collapsed="sidebarCollapsed" />
    
    <NavigationDrawer 
      v-model="drawer" 
      @toggle-collapse="onSidebarCollapse"
    />
    
    <v-main>
      <v-container fluid class="pa-2 pa-md-4" style="margin-top: 104px;">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AuthenticatedHeader from '../common/AuthenticatedHeader.vue'
import SecondaryHeader from '../common/SecondaryHeader.vue'
import NavigationDrawer from '../common/NavigationDrawer.vue'

export default {
  name: 'AuthenticatedLayout',
  components: {
    AuthenticatedHeader,
    SecondaryHeader,
    NavigationDrawer
  },
  data() {
    return {
      drawer: true,
      sidebarCollapsed: false
    }
  },
  methods: {
    onSidebarCollapse(isCollapsed) {
      this.sidebarCollapsed = isCollapsed
    }
  }
}
</script>

<style scoped>
:deep(.v-main) {
  padding-top: 104px !important; /* Account for 48px + 56px headers */
}

@media (max-width: 960px) {
  :deep(.v-main) {
    padding-top: 104px !important;
  }
}

@media (max-width: 600px) {
  :deep(.v-main .v-container) {
    padding: 8px !important;
  }
}
</style>