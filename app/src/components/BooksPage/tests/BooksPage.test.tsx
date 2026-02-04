import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BooksPage from '../Index';
import { findBooks, borrowBook } from '../../../endpoints/books.api';
import type { Book, BorrowResult } from '../../../types/Books';

jest.mock('../../../endpoints/books.api');

const mockFindBooks = findBooks as jest.MockedFunction<typeof findBooks>;
const mockBorrowBook = borrowBook as jest.MockedFunction<typeof borrowBook>;

const mockBooks: Book[] = [
  {
    id: '1',
    title: 'Clean Code',
    author: 'Robert Martin',
    coverUrl: 'https://example.com/clean-code.jpg'
  },
  {
    id: '2',
    title: 'The Pragmatic Programmer',
    author: 'Andy Hunt',
    coverUrl: 'https://example.com/pragmatic.jpg'
  }
];

describe('BooksPage', () => {
  beforeEach(() => {
    mockFindBooks.mockResolvedValue(mockBooks);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Displays the modal with the correct content when the account is suspended.', async () => {
    const suspendedResult: BorrowResult = {
      success: false,
      error: 'ACCOUNT_SUSPENDED'
    };

    mockBorrowBook.mockResolvedValue(suspendedResult);

    render(<BooksPage />);

    await waitFor(() => {
      expect(screen.getByText('Clean Code')).toBeInTheDocument();
    });

    const borrowButtons = screen.getAllByText('BORROW');
    fireEvent.click(borrowButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('Account Suspended')).toBeInTheDocument();
      expect(screen.getByText('Your account is suspended. Contact support to resolve this issue.')).toBeInTheDocument();
      expect(screen.getByText('Contact Support')).toBeInTheDocument();
    });
  });

  test('The button shows the loading status during the request and displays "Borrowed!" upon success.', async () => {
    const successResult: BorrowResult = {
      success: true
    };

    mockBorrowBook.mockImplementation(() => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(successResult), 100);
      });
    });

    render(<BooksPage />);

    await waitFor(() => {
      expect(screen.getByText('Clean Code')).toBeInTheDocument();
    });

    const borrowButtons = screen.getAllByText('BORROW');
    const firstButton = borrowButtons[0];
    
    fireEvent.click(firstButton);

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Borrowed!')).toBeInTheDocument();
    }, { timeout: 3000 });

    const borrowedButton = screen.getByText('Borrowed!').closest('button');
    expect(borrowedButton).toBeDisabled();

    await waitFor(() => {
      expect(screen.queryByText('Borrowed!')).not.toBeInTheDocument();
    }, { timeout: 4000 });
  });
});