<template>
  <AuthenticatedLayout>
    <div>
      <h1 class="text-h4 mb-4">Profile</h1>
      <v-alert type="info" class="mb-4">
        This is the Profile page using the AuthenticatedLayout.
      </v-alert>
      <v-card>
        <v-card-title>User Profile</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="4">
              <v-avatar size="120">
                <img src="https://via.placeholder.com/120" alt="User" />
              </v-avatar>
            </v-col>
            <v-col cols="12" md="8">
              <v-text-field label="Full Name" value="John Doe" readonly />
              <v-text-field label="Email" value="john.doe@example.com" readonly />
              <v-text-field label="Role" value="Administrator" readonly />
              <v-text-field label="Department" value="Engineering" readonly />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
  </AuthenticatedLayout>
</template>

<script>
import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout.vue'

export default {
  name: 'Profile',
  components: {
    AuthenticatedLayout
  }
}
</script>