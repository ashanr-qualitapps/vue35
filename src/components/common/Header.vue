<template>
  <v-app-bar color="primary" dark app>
    <v-avatar size="40" class="mr-3">
      <img alt="Vue logo" src="@/assets/logo.svg" />
    </v-avatar>
    <v-toolbar-title>Vue App</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text to="/">
      <v-icon left>mdi-home</v-icon>
      Home
    </v-btn>
    <v-btn text to="/contact">
      <v-icon left>mdi-email</v-icon>
      Contact
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>