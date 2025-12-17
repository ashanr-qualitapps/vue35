<template>
  <AuthenticatedLayout>
    <div>
      <h1 class="text-h4 mb-4">Analytics</h1>
      <v-row>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>Page Views</v-card-title>
            <v-card-text>
              <div class="text-h3 primary--text">125,432</div>
              <div class="text-caption">This month</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>User Engagement</v-card-title>
            <v-card-text>
              <div class="text-h3 success--text">87.5%</div>
              <div class="text-caption">Average session time</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </AuthenticatedLayout>
</template>

<script>
import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout.vue'

export default {
  name: 'Analytics',
  components: {
    AuthenticatedLayout
  }
}
</script>