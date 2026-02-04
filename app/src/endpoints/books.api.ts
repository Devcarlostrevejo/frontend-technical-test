import axios from 'axios';
import type { Book, BorrowResult } from '../types/Books';

export const findBooks = async (): Promise<Book[]> => {
  try {
    const response = await axios.get('http://localhost:3001/books');
    return response.data
  } catch (error) {
    console.error('Error fetching books', error);
    throw error;
  }
};

export const borrowBook = async (id: string): Promise<BorrowResult> => {
  try {
    const response = await axios.post(`http://localhost:3001/borrow/${id}`);
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data as BorrowResult;
    }
    console.error('Error when lending a book', error);
    throw error;
  }
}