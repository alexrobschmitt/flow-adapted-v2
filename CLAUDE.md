# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev        # Start development server (localhost:3000)
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
npm run test       # Run Jest tests
npm run type-check # Run TypeScript type checking
npm run analyze    # Analyze bundle size
```

## Architecture Overview

This is **Flow Adapted v2**, a Next.js 14 chat application with cognitive adaptability features. The app uses the App Router pattern and focuses on accessibility for different cognitive profiles.

### Core Technology Stack
- **Next.js 15** with App Router and TypeScript 5.8
- **React 19** with advanced concurrent features
- **Firebase 11.9** (Auth + Firestore) for backend services
- **Zustand 5.0** with advanced slice architecture and Immer
- **Shadcn/ui** components with Radix UI primitives
- **Tailwind CSS 4** with PostCSS and custom cognitive theming
- **Testing**: Jest 29 + Testing Library + TypeScript support

### Key Architectural Concepts

**Cognitive Profiles System**: The app adapts its UI and behavior based on four cognitive profiles:
- Default, TDAH (ADHD), Autism, Dyslexia
- Each profile has specific colors, prompts, and UI adaptations
- Configuration in `src/config/cognitive-profiles.ts`

**Authentication Flow**: 
- Firebase Auth with multiple providers (Email, Google, GitHub, Microsoft)
- Auth state managed via Zustand store (`src/store/auth-store.ts`)
- User profiles stored in Firestore

**Chat System**:
- Real-time messaging using Firestore
- AI integration with OpenAI
- Dynamic routing with `app/chat/[chatId]/page.tsx`
- Chat state managed via Zustand store

### Directory Structure Patterns

```
src/
├── app/                 # Next.js App Router (routes)
│   ├── (auth)/         # Auth route group
│   └── chat/[chatId]/  # Dynamic chat routes
├── components/         # React components
│   ├── auth/          # Authentication components
│   ├── chat/          # Chat-specific components
│   └── ui/            # Shadcn/ui primitives
├── lib/firebase/      # Firebase integration
├── store/             # Zustand stores
├── providers/         # React context providers
└── config/            # App configuration
```

### State Management Architecture

**Advanced Zustand Store with Slices**:
- `AppStore` - Combined store with slice architecture
- `AuthSlice` - Authentication state and user data with session management
- `ChatSlice` - Chat sessions and messages with real-time updates
- Uses Immer middleware for immutable updates
- Optimized selectors for performance

**Key Store Files**:
- `src/store/index.ts` - Main store with combined slices and hooks
- `src/store/slices/auth-slice.ts` - Authentication slice with advanced features
- `src/store/slices/chat-slice.ts` - Chat functionality slice
- `src/store/selectors.ts` - Performance-optimized selectors
- `src/store/store-provider.tsx` - Provider with initialization logic

**React Context**:
- StoreProvider for initialization and error handling
- Theme provider for light/dark mode
- Cognitive profile context for adaptive UI

### Firebase Integration

- **Firestore Rules**: Defined in `firestore.rules`
- **Real-time Listeners**: Used for chat updates
- **Server-side Operations**: Firebase Admin SDK integration
- **Project ID**: `flow-adapted`

### Environment Configuration

Required `.env.local` variables:
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

### Component Architecture

- **Shadcn/ui components** for consistent UI primitives
- **Cognitive profile theming** via CSS custom properties
- **Responsive design** with mobile-first approach
- **Portuguese (pt-BR)** as default locale

### Key Files to Understand

- `src/config/cognitive-profiles.ts` - Cognitive adaptation system
- `src/store/auth-store.ts` - Authentication state management
- `src/lib/firebase/` - Firebase configuration and utilities
- `tailwind.config.ts` - Custom theming for cognitive profiles
- `src/app/chat/[chatId]/page.tsx` - Main chat interface

### Testing

No current testing framework is active. Legacy Jest configuration exists in `olds/jest.config.js`.