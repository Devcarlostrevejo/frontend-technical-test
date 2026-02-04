# Book Checkout System

A React TypeScript application for borrowing books from a library with comprehensive error handling and user feedback.

## How to Run the Project

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation & Setup

#### 1. Start the Mock API

```bash
cd api
npm install
npm start
```

The API will be available at `http://localhost:3001`

#### 2. Start the React Application (in a new terminal)

```bash
cd app
npm install
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in terminal)

## How to Run Tests

```bash
cd app
npm test
```

## Approach

### Architecture Overview

The application follows a clean component-based architecture with clear separation of concerns:

#### API Layer
- Centralized HTTP requests using Axios
- Type-safe responses with TypeScript
- Handles both success and error states from the API

#### Component Structure
- **BooksPage**: Main container managing application state and business logic
- **Modal Components**: Three reusable modals for different error states (Account Suspended, Limit Reached, Book Unavailable)
- **ModalHeader**: Shared wrapper component following DRY principle

#### State Management
- React hooks for local state management
- Separate states for loading indicators, errors, and modal visibility
- Set data structure for efficient O(1) lookup of borrowed books
- Optimistic UI updates with 3-second timeout for success feedback

#### Type Safety
- Comprehensive TypeScript types for all data structures
- Discriminated unions for API responses
- No `any` types used throughout the codebase

### Key Design Decisions

**Material-UI**: Chosen for consistent, professional UI components with built-in accessibility.

**Axios over Fetch**: Better error handling and automatic JSON transformation. Crucially, converts HTTP 400 errors (business logic errors) into valid application states.

**Set for Borrowed Books**: O(1) lookup performance is more efficient than array iteration when checking if a book is borrowed.

**Separate Modal Components**: Each error modal in its own file improves maintainability and follows single responsibility principle.

**3-Second Success Feedback**: Provides adequate time for users to see confirmation before automatically resetting to allow another action.

### Testing Strategy

- **Unit Tests**: Components tested in isolation with mocked API calls
- **Async Handling**: Proper use of `waitFor` for testing asynchronous operations
- **User Interactions**: Tests simulate actual user flows (clicking buttons, seeing feedback)
- Two comprehensive tests implemented:
  1. Modal displays correct content when account is suspended
  2. Button shows loading state during request and "Borrowed!" feedback on success

### Error Handling

The application handles three distinct error states returned by the API:
- **ACCOUNT_SUSPENDED**: Shows modal prompting user to contact support
- **LIMIT_REACHED**: Shows modal suggesting user to view their borrowed books
- **BOOK_UNAVAILABLE**: Shows modal asking user to try again later

Success states show inline feedback ("Borrowed!" with green button) that auto-dismisses after 3 seconds.

### Tech Stack

- React 18+ with TypeScript
- Material-UI (MUI) for UI components
- Axios for HTTP requests
- Vite as build tool
- Jest + React Testing Library for testing

---

**Author**: Carlos Trevejo 
**Date**: February 2026