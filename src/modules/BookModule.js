import { createAction, handleActions } from 'redux-actions';

// Constants
export const SET_BOOKS = 'SET_BOOKS@Book';
export const SET_BOOK_STATUS = 'SET_BOOK_STATUSS@Book';

// Actions
export const setBooks = createAction(SET_BOOKS);
export const setBookStatus = createAction(SET_BOOK_STATUS);


export const actions = {
  setBooks,
  setBookStatus
};

const initialState = {
  books: [],
  read: ["nggnmAEACAAJ"],
  reading: [],
  favorite: []
};

export const reducer = handleActions(
  {
    [SET_BOOKS]: (state, { payload }) => ({
      ...state,
      books: payload
    }),
    [SET_BOOK_STATUS]: (state, { payload }) => ({
      ...state,
      read: state.read.filter(item => item !== payload.id),
      reading: state.read.filter(item => item !== payload.id),
      favorite: state.read.filter(item => item !== payload.id),
      [payload.status]: [...state[payload.status], payload.id]
    })
  },
  initialState
);

export default reducer;