import { useEffect, useState } from "react";
import type { Book } from "../../types/Books";
import { findBooks, borrowBook } from "../../endpoints/books.api";
import { Box, Button, Typography } from "@mui/material";
import ModalAccountSuspended from "../../components/BooksPage/ModalAccountSuspended";
import ModalLimitReached from "../../components/BooksPage/ModalLimitReached";
import ModalBookUnavailable from "../../components/BooksPage/ModalBookUnavailable";

const BooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [borrowingBook, setBorrowingBook] = useState<string | null>(null);
  const [borrowedBooks, setBorrowedBooks] = useState<Set<string>>(new Set());

  const [accountSuspendedOpen, setAccountSuspendedOpen] = useState(false);
  const [limitReachedOpen, setLimitReachedOpen] = useState(false);
  const [bookUnavailableOpen, setBookUnavailableOpen] = useState(false);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await findBooks();
        setBooks(data);
      } catch (err) {
        setError('Failed to load books');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  const handleBorrow = async (bookId: string) => {
    try {
      setBorrowingBook(bookId);
      const result = await borrowBook(bookId);

      if (result.success) {
        setBorrowedBooks(prev => new Set(prev).add(bookId));
        setTimeout(() => {
          setBorrowedBooks(prev => {
            const newSet = new Set(prev);
            newSet.delete(bookId);
            return newSet;
          });
        }, 3000);
      } else {
        switch (result.error) {
          case "ACCOUNT_SUSPENDED":
            setAccountSuspendedOpen(true);
            break;
          case "LIMIT_REACHED":
            setLimitReachedOpen(true);
            break;
          case "BOOK_UNAVAILABLE":
            setBookUnavailableOpen(true);
            break;
        }
      }
    } catch (err) {
      console.error('Error borrowing book:', err);
      setError('Failed to borrow book');
    } finally {
      setBorrowingBook(null);
    }
  };

  if (loading && books.length === 0) {
    return <p>Loading books...</p>;
  }

  if (error && books.length === 0) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#dbbc9e', minHeight: '100vh' }}>
      <Box
        sx={{
          width: '100%',
          height: '60px',
          backgroundColor: '#0056b3',
          color: '#dfe9f5',
          justifyItems: 'left',
          alignContent: 'center',
          padding: '10px',
          borderRadius: '10px',
          boxSizing: 'border-box',
        }}
      >
        <Typography variant="h4"><strong>Book Catalog</strong></Typography>
      </Box>

      <Box style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        marginTop: '20px'
      }}>
        {books.map((book) => {
          const isLoading = borrowingBook === book.id;
          const isBorrowed = borrowedBooks.has(book.id);

          return (
            <Box
              key={book.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                backgroundColor: '#fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              <img
                src={book.coverUrl}
                alt={book.title}
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  marginBottom: '10px'
                }}
              />
              <Typography variant="h6" style={{ margin: '10px 0', fontSize: '18px' }}>
                {book.title}
              </Typography>
              <Typography style={{ color: '#666', margin: '5px 0', fontSize: '14px' }}>
                {book.author}
              </Typography>
              <Button
                style={{
                  width: '100%',
                  padding: '10px',
                  marginTop: '10px',
                  backgroundColor: isBorrowed ? '#28a745' : '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
                onClick={() => handleBorrow(book.id)}
                disabled={isLoading || isBorrowed}
              >
                {isLoading ? (
                  'Loading...'
                ) : isBorrowed ? (
                  <>
                    Borrowed!
                  </>
                ) : (
                  'BORROW'
                )}
              </Button>
            </Box>
          );
        })}
      </Box>

      <ModalAccountSuspended 
        open={accountSuspendedOpen} 
        onClose={() => setAccountSuspendedOpen(false)} 
      />
      
      <ModalLimitReached 
        open={limitReachedOpen} 
        onClose={() => setLimitReachedOpen(false)} 
      />
      
      <ModalBookUnavailable 
        open={bookUnavailableOpen} 
        onClose={() => setBookUnavailableOpen(false)} 
      />
    </Box>
  );
};

export default BooksPage;