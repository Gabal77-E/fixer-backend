# Fixer Backend

Secure backend implementation for the Fixer app with Gemini integration, real-time features, and FlutterFlow integration.

## 🚀 Quick Start

1. Clone the repository:
```bash
git clone https://github.com/Gabal77-E/fixer-backend.git
cd fixer-backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configurations
```

4. Start development server:
```bash
npm run dev
```

## 🏗 Architecture

```
Flutter App (FlutterFlow)
       ↓
    Backend Server
  /     |      \
Auth  Media   Gemini
  |     |       |
Database ← → Learning Store
```

## 🔒 Security Features

- JWT-based authentication
- Rate limiting
- CORS protection
- Helmet security headers
- Secure WebSocket connections
- Short-lived tokens for Gemini
- Encrypted media storage

## 🔌 API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- POST `/api/auth/refresh` - Refresh token

### Media
- POST `/api/media/upload` - Upload media
- GET `/api/media/:id` - Get media

### Chat
- WebSocket endpoint: `ws://domain/chat`
- Events: message, media-shared, screen-share, voice-chat

## 🧪 Testing

1. Run all tests:
```bash
npm test
```

2. Test specific features:
```bash
npm test auth
npm test media
npm test chat
```

## 🔧 Configuration

Key configuration files:
- `src/config/env.ts` - Environment variables
- `src/config/database.ts` - Database configuration
- `src/config/gemini.ts` - Gemini API configuration

## 📱 FlutterFlow Integration

1. Add custom actions in FlutterFlow:

```dart
// Initialize backend connection
Future<void> initializeBackend() async {
  final prefs = await SharedPreferences.getInstance();
  final token = prefs.getString('token');
  
  // Setup HTTP client
  dio.options.baseUrl = 'YOUR_BACKEND_URL';
  dio.options.headers['Authorization'] = 'Bearer $token';
  
  // Setup WebSocket
  socket = io('YOUR_WS_URL', 
    OptionBuilder()
      .setTransports(['websocket'])
      .setAuth({'token': token})
      .build()
  );
}

// Handle chat messages
void onChatMessage(dynamic data) {
  // Update UI with new message
  setState(() {
    messages.add(Message.fromJson(data));
  });
}
```

2. Add these endpoints in FlutterFlow:
- Authentication: `YOUR_BACKEND_URL/api/auth/*`
- Media Upload: `YOUR_BACKEND_URL/api/media/upload`
- WebSocket: `YOUR_WS_URL`

## 🛠 Development Workflow

1. Create feature branch:
```bash
git checkout -b feature/your-feature
```

2. Make changes and test:
```bash
npm run lint
npm test
```

3. Commit changes:
```bash
git add .
git commit -m "Add your feature"
```

4. Push and create PR:
```bash
git push origin feature/your-feature
```

## 📝 Common Tasks

### Adding New API Endpoints

1. Create route file in `src/routes/`
2. Add controller in `src/controllers/`
3. Update route index in `src/routes/index.ts`

### Adding WebSocket Events

1. Add event handler in `src/websocket/handlers/`
2. Register in `src/websocket/index.ts`

### Modifying Database Schema

1. Create migration:
```bash
npm run typeorm migration:create
```

2. Update models in `src/database/models/`
3. Run migration:
```bash
npm run typeorm migration:run
```

## 🐛 Troubleshooting

Common issues and solutions:

1. WebSocket Connection Issues
```typescript
// Check WebSocket status
socket.on('connect_error', (error) => {
  console.error('Connection Error:', error);
});
```

2. Authentication Issues
```bash
# Clear tokens
localStorage.removeItem('token');
# Re-login
```

3. Database Connection Issues
```bash
# Check database status
npm run db:status
```

## 📚 Additional Resources

- [FlutterFlow Documentation](https://docs.flutterflow.io)
- [Gemini API Documentation](https://gemini.ai/docs)
- [WebSocket Guide](https://socket.io/docs/v4/)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

## 📄 License

MIT License - see LICENSE file for details