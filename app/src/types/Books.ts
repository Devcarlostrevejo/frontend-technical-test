export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  success?: string;
  error?: string;
}

export type BorrowResult =
  | { success: true }
  | { success: false; error: "ACCOUNT_SUSPENDED" }
  | { success: false; error: "LIMIT_REACHED" }
  | { success: false; error: "BOOK_UNAVAILABLE" };

export type ErrorType = "ACCOUNT_SUSPENDED" | "LIMIT_REACHED" | "BOOK_UNAVAILABLE";
