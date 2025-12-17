# Vue 3 + Vuetify Application

This template is a Vue 3 single-page application with Vuetify UI components and real-time notification support.

## ✨ Features

- 🎨 **Vuetify 3** - Material Design component framework
- 🔄 **Real-time Notifications** - Laravel Echo + Pinia integration
- 🚀 **Vue Router** - Client-side routing
- ⚡ **Vite** - Fast build tool and dev server
- 📱 **Responsive** - Mobile-first design

## 🔔 Real-time Notifications

This app includes a complete real-time notification system:

- **Bell icon** with unread count badge
- **Dropdown** to view all notifications
- **Toast notifications** for real-time updates
- **Laravel integration** via Reverb/Pusher

### Quick Start Notifications

1. Visit `/notification-demo` to test the system
2. See [QUICKSTART.md](./QUICKSTART.md) for 5-minute setup
3. See [NOTIFICATIONS.md](./NOTIFICATIONS.md) for full documentation

### Setting Up Notifications

#### Prerequisites
- Laravel 12 backend with Reverb installed and configured
- Backend running on `http://localhost:8000` (or update `.env`)
- WebSocket server (Reverb) running on `localhost:8080`

#### Environment Configuration

Create or update `.env` in the root directory:

```env
# Reverb WebSocket Configuration
VITE_REVERB_APP_KEY=auto-notification-key
VITE_REVERB_HOST=localhost
VITE_REVERB_PORT=8080
VITE_REVERB_SCHEME=http

# Optional: Pusher Configuration (if using Pusher instead of Reverb)
# VITE_PUSHER_APP_KEY=your-pusher-key
# VITE_PUSHER_HOST=
# VITE_PUSHER_PORT=443
# VITE_PUSHER_SCHEME=https
# VITE_PUSHER_APP_CLUSTER=mt1
```

#### Running with Notifications

1. **Start Laravel Reverb Server** (in Laravel project):
   ```bash
   php artisan reverb:start
   ```

2. **Start Auto-Notification Service** (optional, for testing):
   ```bash
   php artisan notifications:auto-send --user-id=1
   ```

3. **Start Vue Development Server**:
   ```bash
   pnpm dev
   ```

4. **Open Application**:
   - Visit `http://localhost:5173`
   - Click any user icon to connect (simulates user login)
   - Watch for notifications in real-time!

### Testing Notifications

#### Manual Testing via Demo Page

1. Navigate to `/notification-demo`
2. Click "Connect" button with User ID 1
3. Click notification type buttons (Info, Success, Warning, Error)
4. Observe notifications in:
   - Bell icon badge (unread count)
   - Dropdown menu (click bell icon)
   - Toast popups (bottom-right corner)

#### Browser Console Testing

Open DevTools Console (F12) and verify:

```javascript
// 1. Connection established
🔌 Connecting to channel: user.1
✅ Successfully subscribed to channel: user.1
✅ Notification listeners initialized for user: 1

// 2. Notifications received
✅ Received notification event: { id: 123, title: '...', message: '...', type: 'success' }
```

#### Testing with Laravel Test Command

From your Laravel project, manually broadcast a test notification:

```bash
php artisan test:broadcast 1
```

Expected result: Notification appears in Vue app immediately.

#### Automated Testing

Run the test suite:

```bash
pnpm test
```

This will run:
- Unit tests for notification store
- Component tests for NotificationDropdown and NotificationToast
- Integration tests for Laravel Echo connection

### Troubleshooting Notifications

#### No Notifications Appearing?

1. **Check Reverb Server**:
   - Ensure `php artisan reverb:start` is running
   - Look for "Starting server on 0.0.0.0:8080" message

2. **Check Browser Console**:
   - Open DevTools (F12) → Console tab
   - Look for connection errors or WebSocket failures
   - Verify "Successfully subscribed" message appears

3. **Check Channel Name**:
   - Laravel broadcasts to: `user.{id}`
   - Vue listens to: `user.{id}`
   - Ensure IDs match between systems

4. **Check Environment Variables**:
   - Verify `.env` settings match Laravel configuration
   - Restart dev server after `.env` changes: `pnpm dev`

5. **Check CORS Configuration** (in Laravel):
   - Ensure `localhost:5173` is in `allowed_origins`
   - Check `config/cors.php`

#### WebSocket Connection Refused?

- Ensure Reverb server is running: `php artisan reverb:start`
- Check port 8080 is not blocked by firewall
- Verify `VITE_REVERB_PORT=8080` in `.env`

#### Notifications Not Persisting?

- This is a real-time system; notifications are stored in-memory (Pinia)
- Reload page = notifications cleared
- For persistence, integrate with backend API to fetch historical notifications

### Notification API Usage

In your Vue components:

```javascript
import { useNotificationsStore } from '@/stores/notifications'

const notificationsStore = useNotificationsStore()

// Initialize listeners when user logs in
notificationsStore.initializeListeners(userId)

// Add notification programmatically
notificationsStore.addNotification({
  id: Date.now(),
  title: 'Welcome!',
  message: 'You are now connected',
  type: 'success',
  created_at: new Date().toISOString()
})

// Mark as read
notificationsStore.markAsRead(notificationId)

// Mark all as read
notificationsStore.markAllAsRead()

// Clear all notifications
notificationsStore.clearAll()

// Disconnect (on logout)
notificationsStore.disconnect()
```

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
pnpm install
```

**Dependencies include:**
- `laravel-echo` - Real-time event broadcasting client
- `pusher-js` - WebSocket client (used by Reverb)
- `pinia` - State management for notifications
- `@vueuse/core` - Vue composition utilities (used for relative time)

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Compile and Minify for Production

```sh
pnpm build
```
