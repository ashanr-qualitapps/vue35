<template>
  <DefaultLayout>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
          <!-- Connection Status Card -->
          <v-card elevation="2" class="mb-4" :color="connected ? 'success' : 'warning'">
            <v-card-text class="d-flex align-center">
              <v-icon :color="connected ? 'white' : 'black'" class="mr-2">
                {{ connected ? 'mdi-wifi' : 'mdi-wifi-off' }}
              </v-icon>
              <span :class="connected ? 'text-white' : 'text-black'">
                {{ connected ? 'Connected to Reverb' : 'Connecting to Reverb...' }}
              </span>
            </v-card-text>
          </v-card>

          <!-- Welcome Card -->
          <v-card elevation="3" class="mb-4">
            <v-card-title class="text-h4 text-center primary--text">
              <v-icon left size="32">mdi-vuejs</v-icon>
              Welcome Home
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="text-center pa-6">
              <p class="text-h6 mb-4">Vue 3.5.25 with Router and Vuetify!</p>
              <p class="text-body-1 mb-4">
                This application demonstrates a modern Vue.js setup with:
              </p>
              <v-list dense>
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="success">mdi-check</v-icon>
                  </template>
                  <v-list-item-title>Vue 3 Composition API</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="success">mdi-check</v-icon>
                  </template>
                  <v-list-item-title>Vue Router for navigation</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="success">mdi-check</v-icon>
                  </template>
                  <v-list-item-title>Vuetify Material Design</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="success">mdi-check</v-icon>
                  </template>
                  <v-list-item-title>Vite build tooling</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="success">mdi-check</v-icon>
                  </template>
                  <v-list-item-title>Laravel Echo + Reverb Live Notifications</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>

          <!-- Notification Test Card -->
          <v-card elevation="3">
            <v-card-title class="text-h5">
              <v-icon left>mdi-bell-ring</v-icon>
              Test Live Notifications
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-alert type="info" variant="tonal" class="mb-4">
                User ID: <strong>{{ userId }}</strong> | 
                Notifications: <strong>{{ unreadCount }}</strong> unread
              </v-alert>

              <v-form @submit.prevent="sendTestNotification">
                <v-text-field
                  v-model="testNotification.title"
                  label="Notification Title"
                  prepend-icon="mdi-format-title"
                  variant="outlined"
                  density="comfortable"
                  class="mb-2"
                ></v-text-field>

                <v-textarea
                  v-model="testNotification.message"
                  label="Notification Message"
                  prepend-icon="mdi-message-text"
                  variant="outlined"
                  density="comfortable"
                  rows="3"
                  class="mb-2"
                ></v-textarea>

                <v-select
                  v-model="testNotification.type"
                  :items="notificationTypes"
                  label="Notification Type"
                  prepend-icon="mdi-palette"
                  variant="outlined"
                  density="comfortable"
                  class="mb-4"
                ></v-select>

                <v-btn
                  type="submit"
                  color="primary"
                  size="large"
                  block
                  :loading="sending"
                  :disabled="!testNotification.title || !testNotification.message"
                >
                  <v-icon left>mdi-send</v-icon>
                  Send Test Notification
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </DefaultLayout>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import { useNotificationStore } from '@/stores/notifications'

const notificationStore = useNotificationStore()
const { unreadCount, connected } = storeToRefs(notificationStore)

// User ID for this demo (in production, get from auth store)
const userId = ref(1)

// Test notification form
const testNotification = ref({
  title: 'Test Notification',
  message: 'This is a test notification from Laravel Reverb!',
  type: 'info'
})

const notificationTypes = [
  { title: 'Info', value: 'info' },
  { title: 'Success', value: 'success' },
  { title: 'Warning', value: 'warning' },
  { title: 'Error', value: 'error' }
]

const sending = ref(false)

// Send test notification via API
async function sendTestNotification() {
  sending.value = true
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/notifications/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId.value,
        title: testNotification.value.title,
        message: testNotification.value.message,
        type: testNotification.value.type,
      })
    })

    const data = await response.json()

    if (data.success) {
      console.log('✅ Notification sent successfully:', data)
    } else {
      console.error('❌ Failed to send notification:', data)
      alert('Failed to send notification: ' + (data.message || 'Unknown error'))
    }
  } catch (error) {
    console.error('❌ Error sending notification:', error)
    alert('Error sending notification: ' + error.message)
  } finally {
    sending.value = false
  }
}
</script>