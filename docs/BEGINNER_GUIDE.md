# Beginner's Guide to Fixer Backend

## 👋 Getting Started

This guide will walk you through setting up, testing, and connecting the Fixer backend step by step.

### 1️⃣ Initial Setup

```bash
# Clone the repository
git clone https://github.com/Gabal77-E/fixer-backend.git
cd fixer-backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env
```

### 2️⃣ Understanding the Structure

Our backend has these main parts:
- Authentication (JWT)
- Real-time chat (WebSocket)
- Media handling (images/videos)
- Gemini AI integration
- Database storage

### 3️⃣ Step-by-Step Testing

#### Test Authentication:
```bash
# 1. Start the server
npm run dev

# 2. Register a user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# 3. Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Save the token you receive!
```

#### Test WebSocket:
```bash
# 1. Install wscat
npm install -g wscat

# 2. Connect with your token
wscat -c "ws://localhost:3000?token=YOUR_TOKEN"

# 3. Send a message
{"type": "message", "content": "Hello!"}
```

#### Test Media Upload:
```bash
# Upload an image
curl -X POST http://localhost:3000/api/media/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@/path/to/image.jpg"
```

### 4️⃣ FlutterFlow Integration

1. Add these Custom Actions in FlutterFlow:

```dart
// Authentication
Future<void> loginUser() async {
  final response = await http.post(
    Uri.parse('$backendUrl/api/auth/login'),
    body: {
      'email': emailController.text,
      'password': passwordController.text,
    },
  );
  
  if (response.statusCode == 200) {
    final token = jsonDecode(response.body)['token'];
    // Save token
    FFAppState().token = token;
  }
}

// WebSocket Connection
void connectWebSocket() {
  final socket = IO.io('$backendUrl', <String, dynamic>{
    'transports': ['websocket'],
    'autoConnect': false,
    'auth': {'token': FFAppState().token}
  });

  socket.connect();
  socket.on('connect', (_) => print('Connected!'));
  socket.on('message', handleMessage);
}

// Media Upload
Future<void> uploadMedia(File file) async {
  final request = http.MultipartRequest(
    'POST',
    Uri.parse('$backendUrl/api/media/upload'),
  );
  
  request.files.add(
    await http.MultipartFile.fromPath('file', file.path),
  );
  
  request.headers['Authorization'] = 'Bearer ${FFAppState().token}';
  final response = await request.send();
}
```

2. Add UI Components:
   - Login/Register form
   - Chat interface
   - Media upload button
   - Message list
   - Video/voice call buttons

### 5️⃣ Common Issues & Solutions

1. CORS Errors:
```typescript
// Add your FlutterFlow domain to .env
ALLOWED_ORIGINS=https://your-app.flutterflow.app
```

2. WebSocket Connection Failed:
```dart
// Add error handling
socket.on('connect_error', (error) {
  print('Connection Error: $error');
  // Retry logic
});
```

3. Authentication Issues:
```dart
// Check token expiry
if (response.statusCode == 401) {
  // Token expired, refresh it
  await refreshToken();
}
```

### 6️⃣ Security Best Practices

1. Always validate input
2. Use HTTPS in production
3. Never log sensitive data
4. Rotate keys regularly
5. Use rate limiting
6. Implement request timeout

### 7️⃣ Deployment Checklist

- [ ] Update environment variables
- [ ] Configure database
- [ ] Setup GCP credentials
- [ ] Enable HTTPS
- [ ] Configure CORS
- [ ] Test all endpoints
- [ ] Monitor logs

### 8️⃣ Monitoring

1. Check server health:
```bash
curl http://localhost:3000/health
```

2. View logs:
```bash
# Server logs
npm run logs

# Database logs
npm run db:logs
```

### 9️⃣ Need Help?

1. Check the logs first
2. Review documentation
3. Test in isolation
4. Ask in team chat
5. Create detailed issue

Remember: Test everything locally before deploying!