<template>
  <v-app-bar 
    color="white" 
    app 
    height="56" 
    elevation="0" 
    class="secondary-header"
    :class="{ 
      'with-sidebar': withSidebar,
      'collapsed': withSidebar && sidebarCollapsed
    }"
  >
    <div class="d-flex align-center w-100">
      <v-avatar size="32" class="mr-3">
        <v-icon color="primary" size="24">mdi-vuetify</v-icon>
      </v-avatar>
      <v-toolbar-title class="text-h6 text-primary d-none d-sm-block">Vue App</v-toolbar-title>
      <v-toolbar-title class="text-body-1 text-primary d-block d-sm-none">Vue</v-toolbar-title>
      
      <v-spacer />
      
      <!-- Navigation Menu - Hidden on mobile -->
      <div class="d-none d-lg-flex align-center mr-4">
        <v-btn text color="primary" class="mx-1" to="/">
          <v-icon start>mdi-home</v-icon>
          Home
        </v-btn>
        <v-btn text color="primary" class="mx-1" to="/find-match">
          <v-icon start>mdi-account-search</v-icon>
          Find your match
        </v-btn>
        <v-btn text color="primary" class="mx-1" to="/scicomm-toolbox">
          <v-icon start>mdi-toolbox</v-icon>
          Scicomm toolbox
        </v-btn>
        <v-btn text color="primary" class="mx-1" to="/academy">
          <v-icon start>mdi-school</v-icon>
          Academy
        </v-btn>
        <v-btn text color="primary" class="mx-1" to="/policy-impact">
          <v-icon start>mdi-gavel</v-icon>
          Policy impact
        </v-btn>
      </div>
      
      <!-- Mobile Menu Button -->
      <v-menu offset-y class="d-block d-lg-none">
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props" class="mr-2">
            <v-icon color="primary">mdi-menu</v-icon>
          </v-btn>
        </template>
        
        <v-list>
          <v-list-item to="/" prepend-icon="mdi-home">
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item to="/find-match" prepend-icon="mdi-account-search">
            <v-list-item-title>Find your match</v-list-item-title>
          </v-list-item>
          <v-list-item to="/scicomm-toolbox" prepend-icon="mdi-toolbox">
            <v-list-item-title>Scicomm toolbox</v-list-item-title>
          </v-list-item>
          <v-list-item to="/academy" prepend-icon="mdi-school">
            <v-list-item-title>Academy</v-list-item-title>
          </v-list-item>
          <v-list-item to="/policy-impact" prepend-icon="mdi-gavel">
            <v-list-item-title>Policy impact</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      
      <!-- Profile Menu -->
      <v-menu offset-y>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar size="32">
              <img src="https://via.placeholder.com/32" alt="User" />
            </v-avatar>
          </v-btn>
        </template>
        
        <v-list>
          <v-list-item>
            <v-list-item-title>John Doe</v-list-item-title>
            <v-list-item-subtitle>john.doe@example.com</v-list-item-subtitle>
          </v-list-item>
          
          <v-divider />
          
          <v-list-item prepend-icon="mdi-account" to="/profile">
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
          
          <v-list-item prepend-icon="mdi-cog" to="/settings">
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item>
          
          <v-divider />
          
          <v-list-item prepend-icon="mdi-logout" @click="logout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: 'SecondaryHeader',
  props: {
    withSidebar: {
      type: Boolean,
      default: false
    },
    sidebarCollapsed: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    logout() {
      console.log('Logout clicked')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.secondary-header {
  top: 48px !important;
  z-index: 1001;
}

.secondary-header.with-sidebar {
  left: 280px !important;
  width: calc(100% - 280px) !important;
  transition: left 0.2s ease, width 0.2s ease;
}

.secondary-header.with-sidebar.collapsed {
  left: 72px !important;
  width: calc(100% - 72px) !important;
}

@media (max-width: 1264px) {
  .secondary-header.with-sidebar {
    left: 0 !important;
    width: 100% !important;
  }
  
  .secondary-header.with-sidebar.collapsed {
    left: 0 !important;
    width: 100% !important;
  }
}

@media (max-width: 600px) {
  .secondary-header {
    height: 48px !important;
  }
  
  .secondary-header .v-toolbar-title {
    font-size: 1rem !important;
  }
}
</style>