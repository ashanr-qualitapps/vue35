<template>
  <AuthenticatedLayout>
    <div>
      <h1 class="text-h4 mb-4">Reports</h1>
      <v-alert type="info" class="mb-4">
        This is the Reports page using the AuthenticatedLayout.
      </v-alert>
      <v-card>
        <v-card-title>Available Reports</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item prepend-icon="mdi-file-chart" title="Monthly Performance" subtitle="Generate monthly performance reports" />
            <v-list-item prepend-icon="mdi-account-group" title="User Activity" subtitle="Analyze user engagement metrics" />
            <v-list-item prepend-icon="mdi-currency-usd" title="Revenue Report" subtitle="Track revenue and financial metrics" />
          </v-list>
        </v-card-text>
      </v-card>
    </div>
  </AuthenticatedLayout>
</template>

<script>
import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout.vue'

export default {
  name: 'Reports',
  components: {
    AuthenticatedLayout
  }
}
</script>