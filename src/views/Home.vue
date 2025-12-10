<template>
  <DefaultLayout>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
          <v-card elevation="3">
            <v-card-title class="text-h4 text-center primary--text">
              <v-icon left size="32">mdi-vuejs</v-icon>
              Welcome Home
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="text-center pa-6">
              <p class="text-h6 mb-4">Vue 3.5.25 with Router and Vuetify!</p>
              <p class="text-body-1 mb-4">
                This application demonstrates a modern Vue.js setup with:
              </p>
              <v-list dense>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="success">mdi-check</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Vue 3 Composition API</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="success">mdi-check</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Vue Router for navigation</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="success">mdi-check</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Vuetify Material Design</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="success">mdi-check</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Vite build tooling</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn color="primary" to="/contact" large>
                <v-icon left>mdi-email</v-icon>
                Get in Touch
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'

export default {
  name: 'Home',
  components: {
    DefaultLayout
  }
}
</script>