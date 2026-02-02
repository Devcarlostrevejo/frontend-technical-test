# Frontend Developer Technical Test

## Book Checkout System

Build a book checkout feature that handles different user states and API errors with appropriate UI feedback.

**Stack:** React 18+ with TypeScript

---

## Setup

Clone this repository and start the mock API:

```bash
cd api
npm install
npm start
```

The API will run at `http://localhost:3001`

---

## The Challenge

Users can "borrow" books from a library. The API returns different errors based on the user's account status. Your UI must handle each case with the correct modal or feedback.

---

## Requirements

### 1. Fetch and Display Books

Fetch books from the API and display them in a grid with: cover, title, author, and a "Borrow" button.

### 2. Handle the Borrow Action

When clicking "Borrow", call the API. It randomly returns:

```typescript
type BorrowResult =
  | { success: true }
  | { success: false; error: "ACCOUNT_SUSPENDED" }
  | { success: false; error: "LIMIT_REACHED" }
  | { success: false; error: "BOOK_UNAVAILABLE" };
```

### 3. Show Different Modals Based on Error

| Error | Modal Title | Modal Message | Button |
|-------|-------------|---------------|--------|
| `ACCOUNT_SUSPENDED` | Account Suspended | Your account is suspended. Contact support to resolve this issue. | Contact Support |
| `LIMIT_REACHED` | Limit Reached | You've reached your borrowing limit. Return a book to borrow more. | View My Books |
| `BOOK_UNAVAILABLE` | Unavailable | This book is currently unavailable. Try again later. | Close |

**On success:** Show inline feedback on the button (e.g., "Borrowed!" or checkmark) - no modal.

### 4. Loading States

- Show loading indicator on the button while request is pending
- Disable the button during the request

### 5. Write Tests

Write **at least 2 tests**. Examples:
- Modal shows correct content for `ACCOUNT_SUSPENDED`
- Modal shows correct content for `LIMIT_REACHED`
- Button shows loading state during request
- Success shows "Borrowed!" feedback

---

## API Reference

**Base URL:** `http://localhost:3001`

### GET /books

Returns list of books.

```typescript
type Book = {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
};

// Response: Book[]
```

### POST /borrow/:id

Attempts to borrow a book. Randomly returns success or error.

```typescript
// Success (200)
{ success: true }

// Error (400)
{ success: false, error: "ACCOUNT_SUSPENDED" | "LIMIT_REACHED" | "BOOK_UNAVAILABLE" }
```

---

## What We Evaluate

| What | We Look For |
|------|-------------|
| **It works** | Requirements are met, edge cases handled |
| **Code quality** | Clean, readable, well-organized |
| **TypeScript** | Proper types, no `any` |
| **Tests** | At least 2 meaningful tests that pass |
| **Independence** | You figured it out without hand-holding |

---

## Submission

1. Fork this repository
2. Create your React app in a `/app` folder
3. Include a README in `/app` explaining:
   - How to run your project
   - How to run tests
   - Your approach (brief)
4. Send us the link to your fork

---

## Questions?

If unclear, ask. We value people who ask good questions over those who assume.
