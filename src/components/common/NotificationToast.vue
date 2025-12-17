<template>
  <v-snackbar
    v-for="notification in visibleNotifications"
    :key="notification.id"
    v-model="notification.visible"
    :color="getToastColor(notification.type)"
    :timeout="notification.persistent ? -1 : 5000"
    location="top right"
    class="notification-toast"
    :style="{ marginTop: `${getToastOffset(notification.id)}px` }"
  >
    <div class="d-flex align-center">
      <v-icon class="mr-2">{{ getNotificationIcon(notification.type) }}</v-icon>
      <div class="flex-grow-1">
        <div class="font-weight-bold">{{ notification.title }}</div>
        <div class="text-body-2">{{ notification.message }}</div>
      </div>
      <v-btn
        icon
        size="small"
        variant="text"
        @click="closeToast(notification.id)"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
  </v-snackbar>
</template>

<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useNotificationStore } from '@/stores/notifications'

const notificationStore = useNotificationStore()
const { lastNotification } = storeToRefs(notificationStore)

// Track which notifications are currently visible as toasts
const visibleNotifications = ref([])

// Track last processed notification ID to avoid duplicates
const lastProcessedId = ref(null)

// Watch for changes to lastNotification
watch(lastNotification, (newVal) => {
  console.log('🍞 NotificationToast watch triggered:', {
    newNotification: newVal,
    lastProcessedId: lastProcessedId.value,
    showToast: newVal?.showToast
  })

  if (newVal && newVal.id !== lastProcessedId.value) {
    lastProcessedId.value = newVal.id
    
    // Only show toast if showToast flag is true
    if (newVal.showToast) {
      console.log('🍞 ✅ Showing toast for notification:', newVal.id)
      visibleNotifications.value.push({
        ...newVal,
        visible: true
      })
      
      // Auto-remove toast after it disappears
      setTimeout(() => {
        visibleNotifications.value = visibleNotifications.value.filter(
          n => n.id !== newVal.id
        )
      }, 5500)
    } else {
      console.log('🍞 ⚠️ Skipping toast (showToast is false)')
    }
  }
}, { deep: true })

function closeToast(notificationId) {
  const toast = visibleNotifications.value.find(n => n.id === notificationId)
  if (toast) {
    toast.visible = false
    // Remove from visible list after animation
    setTimeout(() => {
      visibleNotifications.value = visibleNotifications.value.filter(
        n => n.id !== notificationId
      )
    }, 300)
  }
}

function getToastColor(type) {
  const colors = {
    info: 'blue-darken-2',
    success: 'green-darken-1',
    warning: 'orange-darken-1',
    error: 'red-darken-1',
  }
  return colors[type] || colors.info
}

function getNotificationIcon(type) {
  const icons = {
    info: 'mdi-information',
    success: 'mdi-check-circle',
    warning: 'mdi-alert',
    error: 'mdi-alert-circle',
  }
  return icons[type] || icons.info
}

// Stack toasts vertically
function getToastOffset(notificationId) {
  const index = visibleNotifications.value.findIndex(n => n.id === notificationId)
  return index * 80 // 80px spacing between toasts
}
</script>

<style scoped>
.notification-toast {
  z-index: 9999;
}

:deep(.v-snackbar__wrapper) {
  min-width: 300px;
  max-width: 400px;
}
</style>
