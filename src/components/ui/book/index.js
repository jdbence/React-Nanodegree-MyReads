import React from 'react';
import {READ, READING, FAVORITE} from 'components/ui/category';
import { camelCase } from 'utils/StringUtil';

const ShelfCategory = ({id, shelf, onClickCategory}) => {
  return (
    <div className="book-shelf">
      <button className={shelf === camelCase(READING) ? "selected" : ''} onClick={()=>onClickCategory(id, camelCase(READING))}>C</button>
      <button className={shelf === camelCase(FAVORITE) ? "selected" : ''} onClick={()=>onClickCategory(id, camelCase(FAVORITE))}>W</button>
      <button className={shelf === camelCase(READ) ? "selected" : ''} onClick={()=>onClickCategory(id, camelCase(READ))}>R</button>
    </div>
  );
};

export const Book = ({id, title, shelf, imageLinks, authors, onClickCategory}) => {
  return (
    <article className="book" key={id}>
      <div className="book-img" style={{backgroundImage: `url(${imageLinks && imageLinks.thumbnail})`}}/>
      <div className="book-info">
        <h4>{title}</h4>
        <p>{authors && authors[0]}</p>
        <ShelfCategory shelf={shelf} id={id} onClickCategory={onClickCategory}/>
      </div>
    </article>
  );
};