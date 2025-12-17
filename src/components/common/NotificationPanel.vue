<template>
  <v-menu offset-y max-width="400" :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" class="mr-2">
        <v-badge :content="unreadCount" :model-value="unreadCount > 0" color="error" overlap>
          <v-icon color="white">mdi-bell</v-icon>
        </v-badge>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="d-flex align-center justify-space-between bg-primary">
        <span class="text-white">Notifications</span>
        <v-btn
          v-if="unreadCount > 0"
          size="small"
          variant="text"
          class="text-white"
          @click="handleMarkAllAsRead"
        >
          Mark all read
        </v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <v-list v-if="recentNotifications.length > 0" max-height="400" class="overflow-y-auto">
        <v-list-item
          v-for="notification in recentNotifications"
          :key="notification.id"
          :class="{ 'bg-blue-grey-lighten-5': !notification.read }"
          @click="handleNotificationClick(notification)"
        >
          <template v-slot:prepend>
            <v-icon :color="getIconColor(notification.type)">
              {{ getIcon(notification.type) }}
            </v-icon>
          </template>

          <v-list-item-title>{{ notification.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ notification.message }}</v-list-item-subtitle>

          <template v-slot:append>
            <div class="d-flex flex-column align-end">
              <v-chip v-if="!notification.read" size="x-small" color="primary" class="mb-1">
                New
              </v-chip>
              <span class="text-caption text-grey">
                {{ formatTime(notification.timestamp) }}
              </span>
            </div>
          </template>
        </v-list-item>
      </v-list>

      <v-card-text v-else class="text-center py-8 text-grey">
        <v-icon size="48" class="mb-2">mdi-bell-off</v-icon>
        <div>No notifications</div>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useNotificationStore } from '@/stores/notifications'

const notificationStore = useNotificationStore()
const { unreadCount, recentNotifications } = storeToRefs(notificationStore)
const { markAsReadOnServer, markAllAsReadOnServer } = notificationStore

function getIcon(type) {
  const icons = {
    info: 'mdi-information',
    success: 'mdi-check-circle',
    warning: 'mdi-alert',
    error: 'mdi-alert-circle',
  }
  return icons[type] || icons.info
}

function getIconColor(type) {
  const colors = {
    info: 'blue',
    success: 'green',
    warning: 'orange',
    error: 'red',
  }
  return colors[type] || colors.info
}

function formatTime(timestamp) {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now - date
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return date.toLocaleDateString()
}

function handleNotificationClick(notification) {
  if (!notification.read) {
    markAsReadOnServer(notification.id)
  }
}

function handleMarkAllAsRead() {
  markAllAsReadOnServer()
}
</script>
