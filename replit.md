# Overview

This is an adapted Facebook Chat API (FCA) library specifically designed for compatibility with GoatBot-V2 by NTKhang03. The library is based on fca-priyansh and provides a clean, simplified interface for Facebook Messenger automation while maintaining full MQTT support and standard FCA message functions.

The project serves as a bridge between Facebook's Messenger platform and bot frameworks, with a focus on reliability, ease of integration, and comprehensive messaging capabilities.

## Project Status

✅ **COMPLETE & READY** - The FCA has been successfully adapted for GoatBot-V2 compatibility.

- **Package Location**: `adapted-fca/` directory
- **Version**: 2.0.0
- **Git Configuration**: frnAlt <sultana01537118@gmail.com>
- **Validation**: All structure checks pass ✅
- **Documentation**: Complete with README, setup guides, and examples

### Next Steps for Deployment
1. Push to GitHub repository (see `adapted-fca/HOW_TO_PUSH.md`)
2. Install in GoatBot-V2: `npm install github:YOUR_USERNAME/REPO`
3. Update GoatBot-V2 code to use this FCA
4. Run and test with GoatBot-V2

### Key Files Created
- `adapted-fca/index.js` - Main entry point (GoatBot-V2 compatible)
- `adapted-fca/package.json` - Package configuration
- `adapted-fca/index.d.ts` - TypeScript definitions
- `adapted-fca/README.md` - Complete documentation
- `adapted-fca/GOATBOT_INTEGRATION.md` - Integration guide
- `adapted-fca/example.js` - Usage examples

# User Preferences

Preferred communication style: Simple, everyday language.

Git Author: frnAlt
Git Email: sultana01537118@gmail.com

# System Architecture

## Core Login & Authentication
- **Entry Point**: `index.js` exports a clean login function compatible with GoatBot-V2 architecture
- **Authentication Methods**: 
  - AppState (cookies) - recommended approach
  - Email/password with optional 2FA support using TOTP
- **Session Management**: Persistent device fingerprinting to avoid "new device" flags and reduce checkpoint triggers
- **Security Features**: Optional appState encryption using crypto-js, backup mechanisms for appState persistence

## Messaging Architecture
- **MQTT Protocol**: Primary messaging transport using `mqtt` library (v4.3.7)
- **Dual API Approach**: 
  - Standard HTTP-based methods for compatibility
  - MQTT-based methods (e.g., `sendMessageMqtt`, `setMessageReactionMqtt`) for faster, real-time operations
- **Message Types**: Text, attachments, stickers, reactions, edits, deletions, typing indicators
- **Load Balancing**: `Extra/Balancer.js` provides API load balancing between HTTP and MQTT methods based on configurable ratios

## Thread & Group Management
- **Thread Operations**: List retrieval, info fetching, history loading, archiving, deletion
- **Group Functions**: Create groups, add/remove users, change admin status, modify settings (name, color, emoji, image)
- **Caching Strategy**: Thread and user data caching with support for both JSON file-based and in-memory databases

## Data Persistence
- **Database Options**: 
  - Default: better-sqlite3 (v11.0.0) for structured data
  - JSON: File-based storage in `Horizon_Database/` directory
- **Cached Data**: Thread information, user profiles, message history
- **AppState Management**: Automatic backup and restore mechanisms with optional encryption

## Error Handling & Safety
- **Safety Systems**: 
  - Anti-checkpoint mechanisms with human-like delays
  - Request pacing to avoid rate limiting
  - Session validation with multi-endpoint health checks
- **Logging**: npmlog-based logging with configurable levels and pretty-ms for timing
- **Error Recovery**: Automatic retry logic, fallback mechanisms, graceful degradation

## Event System
- **Listen Methods**: 
  - `listenMqtt` - MQTT-based event listening (primary)
  - Traditional callback-based event handling
- **Event Types**: Messages, typing indicators, read receipts, presence updates, thread changes
- **WebSocket Support**: Real-time updates via ws library (v8.13.0)

## Developer Experience
- **TypeScript Support**: Full type definitions in `index.d.ts`
- **Promise/Async Support**: Modern async/await alongside traditional callbacks
- **Modular Design**: Functions organized in `src/` directory, utilities in `Extra/`
- **Language Support**: Multi-language support via `Language/index.json` (currently Vietnamese)

## Performance Optimizations
- **Request Optimization**: HTTP request pooling using `got` library with connection keep-alive
- **Efficient Parsing**: cheerio for HTML parsing, minimal DOM manipulation
- **Stream Handling**: duplex streams for file uploads, readable-stream for message processing

# External Dependencies

## Core Communication
- **got** (v11.8.6): HTTP client for Facebook API requests with advanced features
- **mqtt** (v4.3.7): MQTT protocol client for real-time messaging
- **ws** (v8.13.0): WebSocket client for persistent connections
- **request**: Legacy HTTP client (maintained for compatibility)

## Authentication & Security
- **tough-cookie** (v4.1.2): Cookie jar management for session persistence
- **speakeasy**: TOTP 2FA token generation
- **totp-generator** (v0.0.14): Alternative TOTP implementation
- **crypto-js**: Encryption/decryption for appState security
- **aes-js**: AES encryption utilities

## Data Processing
- **cheerio** (v1.0.0-rc.12): HTML parsing for scraping Facebook pages
- **bluebird**: Promise library for async operations
- **lodash**: Utility functions for data manipulation
- **moment** (v2.29.4): Date/time formatting and manipulation

## Database & Storage
- **better-sqlite3** (v11.0.0): Embedded SQL database for structured storage
- **sqlite3** (v5.0.2): Alternative SQLite binding

## Utilities
- **chalk** (v4.1.2): Terminal string styling for logs
- **npmlog**: Logging framework
- **pretty-ms** (v7.0.1): Human-readable time formatting
- **uuid**: Unique identifier generation
- **is-hexcolor** (v1.0.0): Color validation
- **encode32**: Base32 encoding utilities
- **deasync** (v0.1.28): Synchronous execution wrapper

## Development Tools
- **eslint**: Code linting
- **prettier**: Code formatting

## Platform Integration
- **https-proxy-agent**: Proxy support for HTTP requests
- **duplexify** (v4.1.2): Stream utilities
- **readable-stream** (v4.4.0): Stream implementation