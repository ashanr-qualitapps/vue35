<template>
  <AuthenticatedLayout>
    <div>
      <div class="d-flex justify-space-between align-center mb-4 flex-wrap ga-2">
        <h1 class="text-h4 text-h5-sm">Projects</h1>
        <v-btn color="primary" class="d-flex align-center">
          <v-icon start>mdi-plus-circle-outline</v-icon>
          <span class="d-none d-sm-inline">New Project</span>
          <span class="d-inline d-sm-none">New</span>
        </v-btn>
      </div>
      
      <v-row>
        <v-col v-for="project in projects" :key="project.id" cols="12" md="6" lg="4">
          <v-card class="h-100">
            <v-card-title class="d-flex align-center">
              <v-icon :color="project.color" class="mr-2">{{ project.icon }}</v-icon>
              {{ project.name }}
            </v-card-title>
            <v-card-subtitle>{{ project.description }}</v-card-subtitle>
            <v-card-text>
              <div class="mb-2">
                <div class="text-caption mb-1">Progress</div>
                <v-progress-linear 
                  :model-value="project.progress" 
                  :color="project.color"
                  height="8"
                  rounded
                />
                <div class="text-caption mt-1">{{ project.progress }}% Complete</div>
              </div>
              <div class="d-flex justify-space-between text-caption">
                <span>Due: {{ project.dueDate }}</span>
                <span>{{ project.teamSize }} members</span>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn variant="text" color="primary">
                <v-icon start>mdi-eye-outline</v-icon>
                <span class="d-none d-sm-inline">View Details</span>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn icon size="small">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </AuthenticatedLayout>
</template>

<script>
import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout.vue'

export default {
  name: 'Projects',
  components: {
    AuthenticatedLayout
  },
  data() {
    return {
      projects: [
        {
          id: 1,
          name: 'Website Redesign',
          description: 'Modernizing the company website',
          progress: 75,
          color: 'primary',
          icon: 'mdi-web',
          dueDate: 'Dec 31, 2024',
          teamSize: 5
        },
        {
          id: 2,
          name: 'Mobile App',
          description: 'Native mobile application development',
          progress: 45,
          color: 'success',
          icon: 'mdi-cellphone',
          dueDate: 'Jan 15, 2025',
          teamSize: 3
        },
        {
          id: 3,
          name: 'API Integration',
          description: 'Third-party service integration',
          progress: 90,
          color: 'warning',
          icon: 'mdi-api',
          dueDate: 'Dec 20, 2024',
          teamSize: 2
        }
      ]
    }
  }
}
</script>