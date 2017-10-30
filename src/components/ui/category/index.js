import React from 'react';
import {Book} from 'components/ui/book';
import emptyIcon from 'static/icon/empty.svg';

export const READ = 'Read';
export const READING = 'Currently Reading';
export const FAVORITE = 'Want to Read';

const EmptyList = ({icon, msg}) => {
  return (
    <div className="emptyList">
      <img src={icon || emptyIcon} alt={msg} />
      <div>{msg || 'Search for Something Special!'}</div>
    </div>
  );
};

export const Category = ({books, onClickCategory}) => {
  return (
    <section className="book-container">
      {books.map((d) => Book({...d, onClickCategory}))}
      {books.length === 0 && <EmptyList />}
    </section>
  );
};