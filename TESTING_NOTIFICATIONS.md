# Live Notifications Testing Guide

## 🚀 Quick Start - Testing Live Notifications

### Step 1: Start the Laravel Reverb Server

Open a NEW terminal/command prompt and run:

```bash
cd c:\Users\Acer\Documents\apps\laravel12
php artisan config:clear
php artisan reverb:start
```

**OR** Double-click the file: `c:\Users\Acer\Documents\apps\laravel12\start-reverb.bat`

You should see:
```
INFO  Starting server on 0.0.0.0:8080 (localhost).
```

⚠️ **IMPORTANT**: Keep this terminal window open! Reverb must stay running.

---

### Step 2: Verify Vue App is Running

Make sure your Vue development server is running on `http://localhost:5173`

If not, open a NEW terminal and run:
```bash
cd d:\apps\vue35
pnpm dev
```

---

### Step 3: Open Browser Developer Console

1. Open your Vue app: `http://localhost:5173`
2. Open Developer Tools (F12)
3. Go to **Console** tab

---

### Step 4: Check Connection Logs

In the browser console, you should see:

```
🔧 Echo Configuration: {...}
✅ Pusher Connection: CONNECTED
🔌 Socket ID: xxxxx.xxxxx
📡 Echo instance created: Echo {...}
✅ ========================================
✅ SUCCESSFULLY SUBSCRIBED!
✅ ========================================
📡 Channel: user.1
🔌 Connection state: CONNECTED
```

✅ If you see these logs, Echo is **connected successfully**!

❌ If you see errors or "disconnected", check:
- Is Reverb server running?
- Is Laravel running on `localhost:8000`?
- Check for port conflicts

---

### Step 5: Send a Test Notification

1. Go to Home page (should already be there)
2. You'll see a "Test Live Notifications" card
3. Fill in the form (or use the default values):
   - Title: "Test Notification"
   - Message: "This is a test notification from Laravel Reverb!"
   - Type: "info"
4. Click "Send Test Notification"

---

### Step 6: What Should Happen

When you click the button, you should see in the console:

1. **API Request** (from Vue):
   ```
   ✅ Notification sent successfully: {success: true, ...}
   ```

2. **WebSocket Event Received** (from Reverb):
   ```
   🔔 ========================================
   🔔 NOTIFICATION RECEIVED!
   🔔 ========================================
   📡 Channel: user.1
   📦 Raw notification data: {...}
   📋 Title: Test Notification
   💬 Message: This is a test notification from Laravel Reverb!
   ```

3. **Store Update**:
   ```
   ➕ Adding notification to store: {...}
   🔔 Updated lastNotification for toast: {...}
   ```

4. **UI Updates**:
   - A **toast notification** should appear in the bottom-right corner
   - The **bell icon count** in the navbar should increase
   - Clicking the bell icon should show the notification

---

### Step 7: Check Laravel Logs (if notifications not appearing)

If you sent a notification but didn't receive it in Vue:

1. Open: `c:\Users\Acer\Documents\apps\laravel12\storage\logs\laravel.log`
2. Look for recent entries:
   ```
   📢 Broadcasting notification event
   ✅ Notification event dispatched
   ```

3. Check Reverb terminal for broadcast events

---

## 🐛 Troubleshooting

### Issue: "Pusher Connection: DISCONNECTED"

**Solution**: Reverb server is not running
- Start Reverb server (see Step 1)
- Check if port 8080 is already in use

### Issue: "CHANNEL SUBSCRIPTION ERROR"

**Possible causes**:
1. Reverb not running on port 8080
2. Firewall blocking WebSocket connections
3. Wrong REVERB_APP_KEY in .env files

**Check**:
- Vue `.env`: `VITE_REVERB_APP_KEY=auto-notification-key`
- Laravel `.env`: `REVERB_APP_KEY=auto-notification-key`
- Both must match!

### Issue: Notification sent but not received

**Check**:
1. Is Reverb server running and showing connection logs?
2. Browser console - is Echo connected?
3. Laravel logs - is event being broadcast?
4. Channel name matches (both use `user.1`)

**Verify** in browser console:
```javascript
// Check Echo connection
console.log('Socket ID:', window.Echo.socketId())

// Manually test channel
window.Echo.channel('user.1').listen('.notification', (data) => {
  console.log('Manual listener received:', data)
})
```

### Issue: CORS errors in browser console

**Solution**: Already fixed! But if you see CORS errors:
- Check `config/cors.php` includes `http://localhost:5173`
- Run `php artisan config:clear` in Laravel
- Restart Laravel server

---

## 📊 Notification Flow (for debugging)

1. **User clicks "Send Test Notification"**
   - Vue sends POST request to `/api/v1/notifications/send`

2. **Laravel NotificationController**
   - Saves notification to database
   - Broadcasts event: `event(new NotificationSent(...))`
   - Returns success response

3. **Reverb Server**
   - Receives broadcast
   - Sends to all clients subscribed to `user.{userId}` channel

4. **Vue Echo Client**
   - Receives event on channel `user.1`
   - Calls `.listen('.notification', callback)`
   - Store adds notification

5. **UI Updates**
   - `lastNotification` triggers toast watcher
   - Toast component displays notification
   - Bell icon count updates

---

## 🎯 Expected Results

### ✅ Success Indicators

- [ ] Reverb server running on port 8080
- [ ] Echo shows "CONNECTED" in console
- [ ] "SUCCESSFULLY SUBSCRIBED" to channel user.1
- [ ] Clicking button shows API success
- [ ] WebSocket event appears in console
- [ ] Toast notification pops up
- [ ] Bell icon shows count
- [ ] Notification appears in bell dropdown

### ❌ Failure Indicators

- [ ] "Pusher Connection: DISCONNECTED"
- [ ] "CHANNEL SUBSCRIPTION ERROR"
- [ ] No "NOTIFICATION RECEIVED!" log
- [ ] Toast doesn't appear
- [ ] Bell count stays at 0

---

## 📝 Test Checklist

Before reporting issues, verify:

1. ✅ Reverb server is running (check terminal)
2. ✅ Vue dev server is running on localhost:5173
3. ✅ Laravel server is running on localhost:8000
4. ✅ Browser console shows "SUCCESSFULLY SUBSCRIBED!"
5. ✅ No CORS errors in browser console
6. ✅ Notification saved to database (check `user_notifications` table)
7. ✅ Echo is initialized (check App.vue logs)
8. ✅ .env files have matching REVERB_APP_KEY values

---

## 🔍 Manual Database Check

To verify notifications are being saved:

```sql
SELECT * FROM user_notifications ORDER BY created_at DESC LIMIT 5;
```

You should see your test notifications there, even if they don't appear in the UI.

---

## 💡 Key Files Modified

### Laravel Backend
- `app/Events/NotificationSent.php` - Broadcast event (**changed to ShouldBroadcastNow**)
- `app/Http/Controllers/Api/V1/NotificationController.php` - API endpoints
- `config/broadcasting.php` - **NEW FILE** - Broadcasting config
- `config/cors.php` - Added localhost:5173

### Vue Frontend
- `src/App.vue` - Echo initialization
- `src/stores/notifications.js` - Notification store with WebSocket
- `src/plugins/echo.js` - Echo configuration with connection logging
- `src/components/common/NotificationPanel.vue` - Bell icon
- `src/components/common/NotificationToast.vue` - Toast popup
- `.env` - Reverb configuration

---

## 🎉 Next Steps After Testing

Once notifications are working:

1. **Add authentication** - Replace hardcoded userId with real auth
2. **Secure channels** - Use private channels with authentication
3. **Customize notifications** - Add more notification types
4. **Notification sounds** - Add audio alerts for new notifications
5. **Notification persistence** - Mark as read on backend when clicked
6. **Notification center** - Full page showing all notifications

---

## 🆘 Still Not Working?

Run this diagnostic command in browser console:

```javascript
// Diagnostic check
console.log('=== NOTIFICATION DIAGNOSTIC ===')
console.log('1. Echo exists:', !!window.Echo)
console.log('2. Socket connected:', window.Echo?.connector?.pusher?.connection?.state)
console.log('3. Socket ID:', window.Echo?.socketId())
console.log('4. Active channels:', Object.keys(window.Echo?.connector?.channels || {}))
console.log('5. Store connected:', useNotificationStore().connected)
console.log('6. Store unread count:', useNotificationStore().unreadCount)
console.log('7. Store notifications:', useNotificationStore().notifications.length)
```

Share the output if you need help debugging!
