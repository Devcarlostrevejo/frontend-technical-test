import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import BooksPage from './components/BooksPage/Index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BooksPage />
  </StrictMode>,
)
