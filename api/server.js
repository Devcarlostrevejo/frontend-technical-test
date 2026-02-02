import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const books = [
  { id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald", coverUrl: "https://covers.openlibrary.org/b/id/7222246-M.jpg" },
  { id: "2", title: "To Kill a Mockingbird", author: "Harper Lee", coverUrl: "https://covers.openlibrary.org/b/id/8228691-M.jpg" },
  { id: "3", title: "Towards a New Architecture", author: "Le Corbusier", coverUrl: "https://covers.openlibrary.org/b/id/5546156-M.jpg" },
  { id: "4", title: "Pride and Prejudice", author: "Jane Austen", coverUrl: "https://covers.openlibrary.org/b/id/8091016-M.jpg" },
  { id: "5", title: "The Catcher in the Rye", author: "J.D. Salinger", coverUrl: "https://covers.openlibrary.org/b/id/8231856-M.jpg" },
  { id: "6", title: "Brave New World", author: "Aldous Huxley", coverUrl: "https://covers.openlibrary.org/b/id/5112241-M.jpg" },
  { id: "7", title: "The Hobbit", author: "J.R.R. Tolkien", coverUrl: "https://covers.openlibrary.org/b/id/6979861-M.jpg" },
  { id: "8", title: "Fahrenheit 451", author: "Ray Bradbury", coverUrl: "https://covers.openlibrary.org/b/id/1003760-M.jpg" },
  { id: "9", title: "Jane Eyre", author: "Charlotte Brontë", coverUrl: "https://covers.openlibrary.org/b/id/8166471-M.jpg" },
  { id: "10", title: "A Pattern Language", author: "Christopher Alexander", coverUrl: "https://covers.openlibrary.org/b/id/6486528-M.jpg" },
  { id: "11", title: "The Lord of the Rings", author: "J.R.R. Tolkien", coverUrl: "https://covers.openlibrary.org/b/id/8406786-M.jpg" },
  { id: "12", title: "Wuthering Heights", author: "Emily Brontë", coverUrl: "https://covers.openlibrary.org/b/id/12648655-M.jpg" },
];

const randomDelay = () => 400 + Math.floor(Math.random() * 11) * 50;

app.get("/books", (req, res) => {
  setTimeout(() => {
    res.json(books);
  }, randomDelay());
});

app.post("/borrow/:id", (req, res) => {
  const outcomes = [
    { success: true },
    { success: true },
    { success: false, error: "ACCOUNT_SUSPENDED" },
    { success: false, error: "LIMIT_REACHED" },
    { success: false, error: "BOOK_UNAVAILABLE" },
  ];

  const result = outcomes[Math.floor(Math.random() * outcomes.length)];

  setTimeout(() => {
    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json(result);
    }
  }, randomDelay());
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
  console.log(`\nEndpoints:`);
  console.log(`  GET  http://localhost:${PORT}/books`);
  console.log(`  POST http://localhost:${PORT}/borrow/:id`);
});
