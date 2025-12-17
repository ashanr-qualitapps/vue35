import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getEcho } from '@/plugins/echo'

export const useNotificationStore = defineStore('notifications', () => {
  // State
  const notifications = ref([])
  const unreadCount = ref(0)
  const connected = ref(false)
  const userId = ref(null)
  const lastNotification = ref(null)

  // Getters
  const unreadNotifications = computed(() => 
    notifications.value.filter(n => !n.read)
  )

  const recentNotifications = computed(() => 
    notifications.value.slice(0, 10)
  )

  // Actions
  function addNotification(notification, showToast = true) {
    console.log('🔍 addNotification called with:', {
      notification,
      showToast,
      currentCount: notifications.value.length,
      currentUnread: unreadCount.value
    })

    // Check if notification already exists (avoid duplicates)
    const exists = notifications.value.find(n => n.id === notification.id)
    if (exists) {
      console.log('⚠️ Notification already exists, skipping:', notification.id)
      return exists
    }

    const newNotification = {
      id: notification.id || Date.now(),
      title: notification.title || 'Notification',
      message: notification.message || '',
      type: notification.type || 'info', // info, success, warning, error
      read: false,
      timestamp: notification.timestamp || new Date().toISOString(),
      data: notification.data || {},
      showToast: showToast,
      ...notification
    }

    console.log('➕ Adding notification to store:', {
      id: newNotification.id,
      title: newNotification.title,
      message: newNotification.message,
      type: newNotification.type,
      timestamp: newNotification.timestamp,
      showToast: showToast
    });

    notifications.value.unshift(newNotification)
    unreadCount.value++
    
    // Update last notification for toast display BEFORE logging
    if (showToast) {
      // Create a new object to trigger reactivity
      lastNotification.value = {
        id: newNotification.id,
        title: newNotification.title,
        message: newNotification.message,
        type: newNotification.type,
        read: newNotification.read,
        timestamp: newNotification.timestamp,
        data: newNotification.data,
        showToast: true
      }
      console.log('🔔 Updated lastNotification for toast:', {
        id: lastNotification.value.id,
        title: lastNotification.value.title,
        showToast: lastNotification.value.showToast
      })
    }
    
    console.log('📊 Store updated:')
    console.log('   - Total notifications:', notifications.value.length)
    console.log('   - Unread count:', unreadCount.value)
    console.log('   - Last notification:', lastNotification.value)

    // Auto-remove after 10 seconds if not persistent
    if (!notification.persistent) {
      setTimeout(() => {
        removeNotification(newNotification.id)
      }, 10000)
    }

    return newNotification
  }

  function markAsRead(notificationId) {
    const notification = notifications.value.find(n => n.id === notificationId)
    if (notification && !notification.read) {
      notification.read = true
      unreadCount.value = Math.max(0, unreadCount.value - 1)
    }
  }

  function markAllAsRead() {
    notifications.value.forEach(n => {
      n.read = true
    })
    unreadCount.value = 0
  }

  function removeNotification(notificationId) {
    const index = notifications.value.findIndex(n => n.id === notificationId)
    if (index !== -1) {
      const notification = notifications.value[index]
      if (!notification.read) {
        unreadCount.value = Math.max(0, unreadCount.value - 1)
      }
      notifications.value.splice(index, 1)
    }
  }

  function clearAll() {
    notifications.value = []
    unreadCount.value = 0
  }

  /**
   * Initialize real-time listeners for authenticated user
   * @param {number|string} authUserId - The authenticated user's ID
   */
  function initializeListeners(authUserId) {
    if (!authUserId) {
      console.error('User ID required to initialize notification listeners')
      return
    }

    userId.value = authUserId
    const echo = getEcho()

    if (!echo) {
      console.error('Echo instance not found. Make sure Echo is initialized.')
      return
    }

    try {
      // Listen to public channel for this user (no auth required for demo)
      const channelName = `user.${authUserId}`
      console.log('🔌 Connecting to channel:', channelName)
      
      echo.channel(channelName)
        .listen('.notification', (notification) => {
          console.log('🔔 ========================================');
          console.log('🔔 NOTIFICATION RECEIVED!');
          console.log('🔔 ========================================');
          console.log('📡 Channel:', channelName);
          console.log('📦 Raw notification data:', notification);
          console.log('📋 Title:', notification.title);
          console.log('💬 Message:', notification.message || notification.body);
          console.log('🏷️  Type:', notification.type);
          console.log('🆔 ID:', notification.id);
          console.log('⏰ Timestamp:', notification.created_at || new Date().toISOString());
          console.log('📊 Full data:', JSON.stringify(notification, null, 2));
          console.log('🔔 ========================================');
          
          // Add notification with toast enabled (real-time notification)
          addNotification({
            id: notification.id,
            title: notification.title || 'New Notification',
            message: notification.message || notification.body,
            type: notification.type || 'info',
            data: notification.data || notification,
            timestamp: notification.created_at || new Date().toISOString(),
          }, true) // Show toast for real-time notifications
        })
        .subscribed(() => {
          console.log('✅ ========================================');
          console.log('✅ SUCCESSFULLY SUBSCRIBED!');
          console.log('✅ ========================================');
          console.log('📡 Channel:', channelName);
          console.log('🔌 Connection state: CONNECTED');
          console.log('👤 User ID:', authUserId);
          console.log('⏰ Time:', new Date().toLocaleString());
          console.log('✅ ========================================');
          connected.value = true
        })
        .error((error) => {
          console.error('❌ ========================================');
          console.error('❌ CHANNEL SUBSCRIPTION ERROR!');
          console.error('❌ ========================================');
          console.error('📡 Channel:', channelName);
          console.error('🔌 Connection state: FAILED');
          console.error('⚠️  Error:', error);
          console.error('⏰ Time:', new Date().toLocaleString());
          console.error('❌ ========================================');
          connected.value = false
        })

      // Also listen to general notifications channel (optional)
      echo.channel('notifications')
        .listen('.notification.created', (event) => {
          console.log('Public notification:', event)
          addNotification({
            title: event.title,
            message: event.message,
            type: event.type || 'info',
            data: event,
          })
        })

      // You can add more custom event listeners here
      // Example: Real-time updates
      echo.channel(`user.${authUserId}`)
        .listen('.MessageReceived', (event) => {
          console.log('📬 Message received:', event)
          addNotification({
            title: 'New Message',
            message: `${event.sender}: ${event.message}`,
            type: 'info',
            data: event,
          })
        })
        .listen('.TaskAssigned', (event) => {
          console.log('📋 Task assigned:', event)
          addNotification({
            title: 'Task Assigned',
            message: `You've been assigned: ${event.task_name}`,
            type: 'warning',
            data: event,
          })
        })

      console.log('✅ Notification listeners initialized for user:', authUserId)
    } catch (error) {
      console.error('❌ Error initializing notification listeners:', error)
      connected.value = false
    }
  }

  /**
   * Disconnect from real-time channels
   */
  function disconnectListeners() {
    const echo = getEcho()
    if (echo && userId.value) {
      echo.leave(`user.${userId.value}`)
      echo.leave('notifications')
      connected.value = false
      userId.value = null
    }
  }

  /**
   * Fetch notifications from API
   */
  async function fetchNotifications(fetchUserId = null) {
    const targetUserId = fetchUserId || userId.value
    if (!targetUserId) {
      console.error('User ID required to fetch notifications')
      return
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/notifications?user_id=${targetUserId}&per_page=50`,
        {
          headers: {
            'Accept': 'application/json',
          }
        }
      )
      
      const data = await response.json()
      
      if (data.success) {
        // Clear and replace with server data (without showing toasts)
        notifications.value = []
        unreadCount.value = 0
        
        // Add each notification WITHOUT toast
        data.data.forEach(n => {
          notifications.value.push({
            id: n.id,
            title: n.title,
            message: n.message,
            type: n.type,
            read: n.is_read,
            timestamp: n.created_at,
            data: n.data || {},
            showToast: false, // Don't show toast for existing notifications
          })
          
          if (!n.is_read) {
            unreadCount.value++
          }
        })
        
        console.log('✅ Fetched notifications from API:', data.data.length)
        console.log('🔔 Unread count after fetch:', unreadCount.value)
      }
    } catch (error) {
      console.error('❌ Error fetching notifications:', error)
    }
  }

  /**
   * Mark notification as read on server
   */
  async function markAsReadOnServer(notificationId) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/notifications/${notificationId}/mark-as-read`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        }
      )
      
      const data = await response.json()
      
      if (data.success) {
        markAsRead(notificationId)
        console.log('✅ Notification marked as read on server')
      }
    } catch (error) {
      console.error('❌ Error marking notification as read:', error)
    }
  }

  /**
   * Mark all notifications as read on server
   */
  async function markAllAsReadOnServer(targetUserId = null) {
    const userIdToUse = targetUserId || userId.value
    if (!userIdToUse) {
      console.error('User ID required to mark all as read')
      return
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/notifications/mark-all-as-read`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ user_id: userIdToUse })
        }
      )
      
      const data = await response.json()
      
      if (data.success) {
        markAllAsRead()
        console.log('✅ All notifications marked as read on server')
      }
    } catch (error) {
      console.error('❌ Error marking all as read:', error)
    }
  }

  return {
    // State
    notifications,
    unreadCount,
    connected,
    userId,
    lastNotification,
    // Getters
    unreadNotifications,
    recentNotifications,
    // Actions
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    initializeListeners,
    disconnectListeners,
    fetchNotifications,
    markAsReadOnServer,
    markAllAsReadOnServer,
  }
})
