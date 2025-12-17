<template>
  <AuthenticatedLayout>
    <div>
      <h1 class="text-h4 mb-4">Settings</h1>
      <v-alert type="info" class="mb-4">
        This is the Settings page using the AuthenticatedLayout.
      </v-alert>
      <v-card>
        <v-card-title>Application Settings</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item>
              <template v-slot:prepend>
                <v-switch color="primary" />
              </template>
              <v-list-item-title>Email Notifications</v-list-item-title>
              <v-list-item-subtitle>Receive email updates for important events</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <template v-slot:prepend>
                <v-switch color="primary" />
              </template>
              <v-list-item-title>Dark Mode</v-list-item-title>
              <v-list-item-subtitle>Use dark theme across the application</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <template v-slot:prepend>
                <v-switch color="primary" />
              </template>
              <v-list-item-title>Auto-save</v-list-item-title>
              <v-list-item-subtitle>Automatically save your work</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </div>
  </AuthenticatedLayout>
</template>

<script>
import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout.vue'

export default {
  name: 'Settings',
  components: {
    AuthenticatedLayout
  }
}
</script>