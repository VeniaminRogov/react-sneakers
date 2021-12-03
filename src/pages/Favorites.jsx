import React, { useContext } from 'react'
import { Link } from 'react-router-dom';

import AppContext from '../context';
import Card from '../components/Card'

function Favorites ({addToFavorites})  {
  const {favorites} = useContext(AppContext);

  return(
    <div className="content">
      <div className="contentWrapper">
        <div className="contentTitle">
          <Link to="/">
            <img width={35} height={35} src="/img/back.svg" alt="back" />
          </Link>
          <h1>Мои закладки</h1>
        </div>
      </div>
        <div className="container">
        {
        favorites.map((item, index) => (
          <Card 
            key={index}
            favorited={true}
            onFavorite={obj => addToFavorites(obj)}
            {...item}
          />
          )
        )}
        </div>
      </div>
  );
}

export default Favorites;