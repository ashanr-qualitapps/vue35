<template>
  <router-view />
  <NotificationToast />
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import NotificationToast from '@/components/common/NotificationToast.vue'
import { createEcho } from '@/plugins/echo'
import { useNotificationStore } from '@/stores/notifications'

const notificationStore = useNotificationStore()

// User ID - in production, get this from auth store
const userId = 1

// Initialize Echo and notification listeners when app starts
onMounted(async () => {
  console.log('🚀 App mounted - initializing Echo and notifications...')
  
  // Create Echo instance
  const echo = createEcho()
  console.log('📡 Echo instance created:', echo)
  
  // Small delay to ensure Echo is ready
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Initialize notification listeners for this user
  notificationStore.initializeListeners(userId)
  
  // Small delay to ensure listeners are subscribed
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Fetch existing notifications from database
  await notificationStore.fetchNotifications(userId)
  
  console.log('✅ Echo and notifications initialized globally')
  console.log('✅ Ready to receive real-time notifications')
})

// Cleanup on unmount
onUnmounted(() => {
  console.log('👋 App unmounting')
  notificationStore.disconnectListeners()
})
</script>
