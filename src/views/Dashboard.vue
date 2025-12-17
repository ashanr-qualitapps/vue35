<template>
  <AuthenticatedLayout>
    <div>
      <v-row class="mb-4">
        <v-col cols="12">
          <h1 class="text-h4 font-weight-bold mb-2">Welcome back, Ashan!</h1>
          <p class="text-body-1 text-medium-emphasis">Here's what's happening with your projects today.</p>
        </v-col>
      </v-row>
      
      <!-- Stats Cards -->
      <v-row class="mb-6">
        <v-col v-for="stat in stats" :key="stat.title" cols="12" sm="6" lg="3">
          <v-card class="pa-4" elevation="2">
            <div class="d-flex align-center">
              <div class="flex-grow-1">
                <div class="text-h6 font-weight-bold">{{ stat.value }}</div>
                <div class="text-body-2 text-medium-emphasis">{{ stat.title }}</div>
              </div>
              <v-icon :color="stat.color" size="32">{{ stat.icon }}</v-icon>
            </div>
            <div class="mt-2">
              <v-chip :color="stat.trend === 'up' ? 'success' : 'error'" size="small" variant="text">
                <v-icon start>{{ stat.trend === 'up' ? 'mdi-trending-up' : 'mdi-trending-down' }}</v-icon>
                {{ stat.change }}
              </v-chip>
            </div>
          </v-card>
        </v-col>
      </v-row>
      
      <v-row>
        <!-- Recent Activity -->
        <v-col cols="12" md="8">
          <v-card>
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2">mdi-clock</v-icon>
              Recent Activity
            </v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item
                  v-for="activity in recentActivity"
                  :key="activity.id"
                  class="px-0"
                >
                  <template v-slot:prepend>
                    <v-avatar :color="activity.color" size="32">
                      <v-icon color="white">{{ activity.icon }}</v-icon>
                    </v-avatar>
                  </template>
                  
                  <v-list-item-title>{{ activity.title }}</v-list-item-title>
                  <v-list-item-subtitle>{{ activity.time }}</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
        
        <!-- Quick Actions -->
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2">mdi-lightning-bolt</v-icon>
              Quick Actions
            </v-card-title>
            <v-card-text>
              <div class="d-flex flex-column ga-3">
                <v-btn
                  v-for="action in quickActions"
                  :key="action.title"
                  :color="action.color"
                  :prepend-icon="action.icon"
                  block
                  variant="outlined"
                >
                  {{ action.title }}
                </v-btn>
              </div>
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
  name: 'Dashboard',
  components: {
    AuthenticatedLayout
  },
  data() {
    return {
      stats: [
        {
          title: 'Total Projects',
          value: '24',
          icon: 'mdi-folder-multiple-outline',
          color: 'primary',
          change: '+12%',
          trend: 'up'
        },
        {
          title: 'Active Users',
          value: '1,234',
          icon: 'mdi-account-group-outline',
          color: 'success',
          change: '+5%',
          trend: 'up'
        },
        {
          title: 'Tasks Completed',
          value: '89',
          icon: 'mdi-check-circle-outline',
          color: 'info',
          change: '+23%',
          trend: 'up'
        },
        {
          title: 'Revenue',
          value: '$12,345',
          icon: 'mdi-currency-usd',
          color: 'warning',
          change: '-2%',
          trend: 'down'
        }
      ],
      recentActivity: [
        {
          id: 1,
          title: 'New project "Website Redesign" created',
          time: '2 hours ago',
          icon: 'mdi-plus-circle-outline',
          color: 'success'
        },
        {
          id: 2,
          title: 'Task "Update documentation" completed',
          time: '4 hours ago',
          icon: 'mdi-check-circle-outline',
          color: 'info'
        },
        {
          id: 3,
          title: 'User John Smith joined the team',
          time: '1 day ago',
          icon: 'mdi-account-plus-outline',
          color: 'primary'
        },
        {
          id: 4,
          title: 'Monthly report generated',
          time: '2 days ago',
          icon: 'mdi-file-chart-outline',
          color: 'warning'
        }
      ],
      quickActions: [
        {
          title: 'Create Project',
          icon: 'mdi-plus-circle-outline',
          color: 'primary'
        },
        {
          title: 'Add User',
          icon: 'mdi-account-plus-outline',
          color: 'success'
        },
        {
          title: 'Generate Report',
          icon: 'mdi-file-chart-outline',
          color: 'info'
        },
        {
          title: 'View Analytics',
          icon: 'mdi-chart-line',
          color: 'warning'
        }
      ]
    }
  }
}
</script>