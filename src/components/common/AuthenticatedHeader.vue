<template>
  <v-app-bar color="primary" dark app height="48" elevation="0">
    <v-app-bar-nav-icon @click="$emit('toggle-drawer')" class="d-block d-md-none" />
    
    <v-toolbar-title class="d-none d-sm-block">Dashboard</v-toolbar-title>
    <v-toolbar-title class="d-block d-sm-none text-body-1">Dash</v-toolbar-title>
    
    <v-spacer />
    
    <!-- Desktop Actions -->
    <div class="d-none d-sm-flex align-center">
      <!-- Home Link -->
      <v-btn icon to="/" class="mr-2">
        <v-icon color="white">mdi-home-outline</v-icon>
      </v-btn>
      
      <!-- Logout Button -->
      <v-btn text @click="logout">
        <v-icon start color="white">mdi-logout</v-icon>
        Log out
      </v-btn>
    </div>
    
    <!-- Mobile Menu -->
    <v-menu offset-y class="d-block d-sm-none">
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-icon color="white">mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      
      <v-list>
        <v-list-item to="/" prepend-icon="mdi-home-outline">
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout" prepend-icon="mdi-logout">
          <v-list-item-title>Log out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AuthenticatedHeader',
  emits: ['toggle-drawer'],
  methods: {
    logout() {
      // Handle logout logic here
      console.log('Logout clicked')
      // For demo purposes, redirect to home
      this.$router.push('/')
    }
  }
}
</script>