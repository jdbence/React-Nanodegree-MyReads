import React from 'react';
import {READ, READING, FAVORITE} from 'components/ui/category';
import { camelCase } from 'utils/StringUtil';

const ShelfCategory = ({id, shelf, onClickCategory}) => {
  const reading = shelf === camelCase(READING) ? "selected" : '';
  const fav = shelf === camelCase(FAVORITE) ? "selected" : '';
  const read = shelf === camelCase(READ) ? "selected" : '';
  return (
    <div className="book-shelf">
      <button className={reading} onClick={()=>onClickCategory(id, reading !== '' ? 'ds' : camelCase(READING))}>C</button>
      <button className={fav} onClick={()=>onClickCategory(id, fav !== '' ? 'ds' : camelCase(FAVORITE))}>W</button>
      <button className={read} onClick={()=>onClickCategory(id, read !== '' ? 'ds' : camelCase(READ))}>R</button>
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