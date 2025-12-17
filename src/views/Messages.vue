<template>
  <AuthenticatedLayout>
    <div>
      <h1 class="text-h4 mb-4">Messages</h1>
      <v-alert type="info" class="mb-4">
        This is the Messages page using the AuthenticatedLayout.
      </v-alert>
      <v-card>
        <v-card-title>Recent Messages</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item prepend-icon="mdi-email" title="Welcome to the team!" subtitle="From: HR Department - 2 hours ago" />
            <v-list-item prepend-icon="mdi-email" title="Project Update Required" subtitle="From: Project Manager - 1 day ago" />
            <v-list-item prepend-icon="mdi-email" title="System Maintenance Notice" subtitle="From: IT Support - 2 days ago" />
          </v-list>
        </v-card-text>
      </v-card>
    </div>
  </AuthenticatedLayout>
</template>

<script>
import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout.vue'

export default {
  name: 'Messages',
  components: {
    AuthenticatedLayout
  }
}
</script>