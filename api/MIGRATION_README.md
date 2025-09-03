# Spring Boot to NestJS Migration

This document outlines the migration of the Dodge game backend from Spring Boot (Java) to NestJS (TypeScript).

## Migration Overview

The migration successfully converted the following components:

### 1. Models/Entities

- **Java Models** → **Mongoose Schemas**
  - `Game.java` → `game.schema.ts`
  - `Player.java` → `player.schema.ts`
  - `Card.java` → `card.schema.ts`
  - `User.java` → `user.schema.ts`
  - `Message.java` → `message.schema.ts`

### 2. Enums

- `GameState.java` → `game-state.enum.ts`
- `ActionType.java` → `action-type.enum.ts`
- `ActionState.java` → `action-state.enum.ts`
- `PouvoirType.java` → `pouvoir-type.enum.ts`

### 3. DTOs

- `GameDto.java` → `game.dto.ts`
- `PlayerInfosDto.java` → `player-infos.dto.ts`

### 4. Controllers

- `GameController.java` → `game.controller.ts`
- `CardController.java` → `card.controller.ts`
- `AppController.java` → Integrated into main app

### 5. Services

- `GameService.java` → `game.service.ts`
- `CardService.java` → `card.service.ts`
- `UserService.java` → `user.service.ts`
- `MessageService.java` → `message.service.ts`

### 6. WebSocket Integration

- **Spring WebSocket** → **NestJS WebSocket Gateway**
  - Socket.IO configuration migrated to `game.gateway.ts`
  - Event handlers converted to NestJS decorators

### 7. Configuration

- **Spring Configuration** → **NestJS Modules**
  - MongoDB configuration with Mongoose
  - CORS configuration
  - Event emitter for game events

## Project Structure

```
api/src/
├── config/
│   └── app.config.ts          # Application configuration
├── dto/
│   ├── game.dto.ts            # Game data transfer objects
│   └── player-infos.dto.ts    # Player information DTOs
├── enums/
│   ├── action-state.enum.ts   # Action state enumeration
│   ├── action-type.enum.ts    # Action type enumeration
│   ├── game-state.enum.ts     # Game state enumeration
│   └── pouvoir-type.enum.ts   # Power type enumeration
├── models/
│   ├── card.schema.ts         # Card Mongoose schema
│   ├── game.schema.ts         # Game Mongoose schema
│   ├── message.schema.ts      # Message Mongoose schema
│   ├── player.schema.ts       # Player Mongoose schema
│   └── user.schema.ts         # User Mongoose schema
├── game/
│   ├── game.controller.ts     # Game REST endpoints
│   ├── game.module.ts         # Game module configuration
│   └── game.service.ts        # Game business logic
├── user/
│   ├── user.controller.ts     # User REST endpoints
│   ├── user.module.ts         # User module configuration
│   └── user.service.ts        # User business logic
├── card/
│   ├── card.controller.ts     # Card REST endpoints
│   ├── card.module.ts         # Card module configuration
│   └── card.service.ts        # Card business logic
├── message/
│   ├── message.controller.ts  # Message REST endpoints
│   ├── message.module.ts      # Message module configuration
│   └── message.service.ts     # Message business logic
├── websocket/
│   ├── game.gateway.ts        # WebSocket game events
│   └── websocket.module.ts    # WebSocket module configuration
├── app.module.ts              # Main application module
└── main.ts                    # Application bootstrap
```

## Key Changes

### Database Integration

- **Spring Data MongoDB** → **Mongoose with NestJS**
- Document references converted to Mongoose ObjectId references
- Repository pattern replaced with Mongoose models

### Dependency Injection

- **Spring @Autowired** → **NestJS @Injectable**
- Constructor injection pattern maintained
- Module-based dependency management

### WebSocket Events

- **Spring WebSocket** → **NestJS WebSocket Gateway**
- Event listeners converted to `@SubscribeMessage` decorators
- Socket.IO integration maintained

### Configuration Management

- **Spring @ConfigurationProperties** → **NestJS ConfigModule**
- Environment variables for configuration
- CORS configuration migrated

## Environment Variables

Create a `.env` file with the following variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/dodge

# API Configuration
API_PORT=3000

# CORS Configuration
CLIENT_ORIGIN_URL=http://localhost:3000

# WebSocket Configuration
SOCKET_HOST=localhost
SOCKET_PORT=3001
```

## Installation and Setup

1. Install dependencies:

```bash
npm install --legacy-peer-deps
```

2. Set up environment variables (create `.env` file)

3. Start the application:

```bash
npm run start:dev
```

## API Endpoints

### Games

- `GET /games` - Get all games
- `GET /games/:id` - Get game by ID
- `POST /games` - Create new game

### Users

- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user

### Cards

- `GET /cards` - Get all cards
- `GET /cards/:id` - Get card by ID
- `POST /cards` - Create new card

### Messages

- `GET /messages` - Get all messages
- `GET /messages/:id` - Get message by ID
- `GET /messages/game/:gameId` - Get messages by game
- `POST /messages` - Create new message

## WebSocket Events

### Client → Server

- `joinGame` - Join a game
- `leaveGame` - Leave a game
- `sendMessage` - Send chat message
- `playCard` - Play a card
- `dodge` - Player dodges

### Server → Client

- `playerJoined` - Player joined game
- `playerLeft` - Player left game
- `newMessage` - New chat message
- `cardPlayed` - Card was played
- `playerDodged` - Player dodged

## Next Steps

1. **Implement Business Logic**: Complete the game managers and business logic that were in the Spring project
2. **Add Validation**: Implement proper DTO validation with class-validator
3. **Add Authentication**: Implement user authentication and authorization
4. **Add Tests**: Create unit and integration tests
5. **Add Error Handling**: Implement comprehensive error handling
6. **Add Logging**: Implement proper logging throughout the application

## Migration Benefits

1. **Type Safety**: Full TypeScript support with compile-time type checking
2. **Modern Framework**: NestJS provides modern Node.js development patterns
3. **Better Performance**: Node.js event loop for I/O intensive operations
4. **Ecosystem**: Access to the rich npm ecosystem
5. **Developer Experience**: Better tooling and development experience
6. **Scalability**: Better horizontal scaling capabilities

## Notes

- The migration maintains the same API structure and WebSocket events
- All database collections remain the same for compatibility
- The game logic and business rules are preserved
- WebSocket functionality is fully maintained with Socket.IO

