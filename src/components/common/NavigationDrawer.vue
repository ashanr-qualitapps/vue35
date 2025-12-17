<template>
  <v-navigation-drawer
    v-model="localValue"
    app
    color="primary"
    :width="isCollapsed ? 72 : 280"
    class="custom-drawer"
  >
    <!-- Collapse/Expand Toggle -->
    <div class="d-flex justify-end pa-2">
      <v-btn 
        icon 
        size="small" 
        @click="toggleCollapse"
        class="white--text"
      >
        <v-icon color="white">{{ isCollapsed ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
      </v-btn>
    </div>
    
    <!-- User Info Section -->
    <v-list-item v-if="!isCollapsed" class="pa-4 white--text">
      <template v-slot:prepend>
        <v-avatar size="48">
          <img src="https://via.placeholder.com/48" alt="User" />
        </v-avatar>
      </template>
      
      <v-list-item-title class="font-weight-medium white--text">John Doe</v-list-item-title>
      <v-list-item-subtitle class="white--text" style="opacity: 0.7;">Administrator</v-list-item-subtitle>
    </v-list-item>
    
    <!-- Collapsed User Avatar -->
    <div v-if="isCollapsed" class="d-flex justify-center pa-2">
      <v-avatar size="40">
        <img src="https://via.placeholder.com/40" alt="User" />
      </v-avatar>
    </div>
    
    <v-divider v-if="!isCollapsed" />
    
    <!-- Navigation Menu -->
    <v-list nav density="compact">
      <v-list-item
        v-for="item in navigationItems"
        :key="item.title"
        :to="item.to"
        :prepend-icon="item.icon"
        :title="isCollapsed ? '' : item.title"
        color="white"
        rounded="xl"
        class="ma-1 white--text"
      >
        <template v-slot:prepend>
          <v-icon color="white">{{ item.icon }}</v-icon>
        </template>
        <template v-if="isCollapsed" v-slot:default>
          <v-tooltip activator="parent" location="end">
            {{ item.title }}
          </v-tooltip>
        </template>
      </v-list-item>
    </v-list>
    
    <v-divider v-if="!isCollapsed" class="my-4" />
    
    <!-- Secondary Menu -->
    <v-list v-if="!isCollapsed" nav density="compact">
      <v-list-item
        v-for="item in secondaryItems"
        :key="item.title"
        :to="item.to"
        :prepend-icon="item.icon"
        :title="item.title"
        color="white"
        rounded="xl"
        class="ma-1 white--text"
      >
        <template v-slot:prepend>
          <v-icon color="white">{{ item.icon }}</v-icon>
        </template>
      </v-list-item>
    </v-list>
    
    <!-- Footer Section -->
    <template v-if="!isCollapsed" v-slot:append>
      <div class="pa-4">
        <v-btn
          block
          color="white"
          variant="outlined"
          size="small"
        >
          <v-icon color="white" class="mr-2">mdi-help-circle-outline</v-icon>
          Help & Support
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavigationDrawer',
  props: {
    modelValue: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue'],
  computed: {
    localValue: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  },
  data() {
    return {
      isCollapsed: false,
      navigationItems: [
        {
          title: 'Dashboard',
          icon: 'mdi-view-dashboard-outline',
          to: '/dashboard'
        },
        {
          title: 'Analytics',
          icon: 'mdi-chart-line',
          to: '/analytics'
        },
        {
          title: 'Users',
          icon: 'mdi-account-group-outline',
          to: '/users'
        },
        {
          title: 'Projects',
          icon: 'mdi-folder-multiple-outline',
          to: '/projects'
        },
        {
          title: 'Reports',
          icon: 'mdi-file-chart-outline',
          to: '/reports'
        },
        {
          title: 'Messages',
          icon: 'mdi-message-outline',
          to: '/messages'
        }
      ],
      secondaryItems: [
        {
          title: 'Settings',
          icon: 'mdi-cog-outline',
          to: '/settings'
        },
        {
          title: 'Profile',
          icon: 'mdi-account-outline',
          to: '/profile'
        }
      ]
    }
  },
  methods: {
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed
      this.$emit('toggle-collapse', this.isCollapsed)
    }
  },
  emits: ['update:modelValue', 'toggle-collapse']
}
</script>

<style scoped>
.custom-drawer {
  top: 48px !important; /* Position below reduced height main header */
}

@media (max-width: 960px) {
  .custom-drawer {
    z-index: 1002 !important;
  }
}

:deep(.v-list-item--active) {
  background-color: rgba(255, 255, 255, 0.1) !important;
  font-weight: 600;
}

:deep(.v-list-item--active .v-list-item__overlay) {
  opacity: 0.1;
}

:deep(.v-list-item:hover) {
  background-color: rgba(255, 255, 255, 0.05) !important;
}

:deep(.v-divider) {
  border-color: rgba(255, 255, 255, 0.2) !important;
}
</style>