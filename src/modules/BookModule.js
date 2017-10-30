import { createAction, handleActions } from 'redux-actions';
import { update } from 'utils/BookAPI';

// Constants
export const SET_BOOKS = 'SET_BOOKS@Book';
export const SET_BOOK_STATUS = 'SET_BOOK_STATUS@Book';

// Actions
export const setBooks = createAction(SET_BOOKS);
export const setBookStatus = createAction(SET_BOOK_STATUS);


export const actions = {
  setBooks,
  setBookStatus
};

const initialState = {
  books: []
};

const updateBookStatus = (books, id, shelf, book) => {
  let bookInList = books.find(b => b.id === id);
  
  // book needs to be added
  if(!bookInList){
    books = [...books];
    if(book){
      book.shelf = shelf;
      books.push(book);
      update(book, shelf);
    }
    return books;
  }
  update(bookInList, shelf);
  bookInList.shelf = shelf;
  return books.map(b => b.id === id ? bookInList : b);
};

export const reducer = handleActions(
  {
    [SET_BOOKS]: (state, { payload }) => ({
      ...state,
      books: payload
    }),
    [SET_BOOK_STATUS]: (state, { payload }) => ({
      ...state,
      books: updateBookStatus(state.books, payload.id, payload.shelf, payload.book)
    })
  },
  initialState
);

export default reducer;