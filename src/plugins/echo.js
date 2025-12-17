import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

// Make Pusher available globally for Laravel Echo
window.Pusher = Pusher

let echoInstance = null

/**
 * Initialize Laravel Echo with broadcasting configuration
 * Supports both Pusher and Laravel Reverb
 */
export function createEcho(config = {}) {
  // Default configuration - override via .env or config parameter
  const defaultConfig = {
    broadcaster: 'pusher', // Laravel Echo uses 'pusher' protocol even for Reverb
    key: import.meta.env.VITE_REVERB_APP_KEY || import.meta.env.VITE_PUSHER_APP_KEY || '',
    // Pusher client requires a cluster value; allow override via env.
    cluster:
      import.meta.env.VITE_REVERB_APP_CLUSTER || import.meta.env.VITE_PUSHER_APP_CLUSTER || 'mt1',
    wsHost: import.meta.env.VITE_REVERB_HOST || window.location.hostname,
    wsPort: import.meta.env.VITE_REVERB_PORT || 8080,
    wssPort: import.meta.env.VITE_REVERB_PORT || 443,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME || 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
    // For authenticated channels - disabled for demo
    // authEndpoint: import.meta.env.VITE_API_URL 
    //   ? `${import.meta.env.VITE_API_URL}/broadcasting/auth`
    //   : 'http://localhost:8000/broadcasting/auth',
    // auth: {
    //   headers: {
    //     // Add authorization token if using authenticated channels
    //     // Authorization: `Bearer ${localStorage.getItem('token')}`,
    //     Accept: 'application/json',
    //   },
    // },
  }

  const echoConfig = { ...defaultConfig, ...config }

  console.log('🔧 Echo Configuration:', {
    broadcaster: echoConfig.broadcaster,
    key: echoConfig.key,
    wsHost: echoConfig.wsHost,
    wsPort: echoConfig.wsPort,
    forceTLS: echoConfig.forceTLS,
    enabledTransports: echoConfig.enabledTransports
  })

  // Create Echo instance (uses Pusher protocol for both Pusher and Reverb)
  echoInstance = new Echo(echoConfig)

  // Add global connection event listeners
  echoInstance.connector.pusher.connection.bind('connected', () => {
    console.log('✅ Pusher Connection: CONNECTED')
    console.log('🔌 Socket ID:', echoInstance.socketId())
  })

  echoInstance.connector.pusher.connection.bind('disconnected', () => {
    console.log('❌ Pusher Connection: DISCONNECTED')
  })

  echoInstance.connector.pusher.connection.bind('error', (error) => {
    console.error('❌ Pusher Connection Error:', error)
  })

  return echoInstance
}

/**
 * Get the existing Echo instance
 */
export function getEcho() {
  if (!echoInstance) {
    console.warn('Echo not initialized. Call createEcho() first.')
  }
  return echoInstance
}

/**
 * Disconnect Echo instance
 */
export function disconnectEcho() {
  if (echoInstance) {
    echoInstance.disconnect()
    echoInstance = null
  }
}

export default {
  install(app, options = {}) {
    const echo = createEcho(options)
    app.config.globalProperties.$echo = echo
    app.provide('echo', echo)
  },
}
