import React from 'react';

import Card from '../components/Card'

function Home  (
  {
  items,
  serchValue,
  setSearchValue,
  onChangeSearchInput,
  addToCart,
  addToFavorites,
  cartItems,
  isLoading
}
)  {
  const filtredItems = items.filter(item => item.name.toLowerCase().includes(serchValue.toLowerCase()));
  const renderItems = () => {
    return (
      (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
        <Card
          key={index}
          onCart={obj => addToCart(obj)}
          onFavorite={obj => addToFavorites(obj)}
          added={cartItems.some(obj => Number(obj.id) === Number(item.id))}
          loading={isLoading}
          {...item}
        />
        )
      )
    );
  }
  return(
    <div className="content">
        <div className="contentWrapper">
          <h1>{serchValue ? `Поиск по запросу: "${serchValue}"` : "Все кроссовки"}</h1>
          <div className="search">
            <img width={14} height={14} src="/img/search.svg" alt="search" />
            {serchValue && 
              <img 
                onClick={() => setSearchValue('')} 
                className="searchClear"
                src="/img/btn-remove.svg" alt="remove" 
              />
            }
            <input 
              onChange={onChangeSearchInput} 
              value={serchValue} 
              type="text" 
              placeholder="Поиск ..." 
            />
          </div>
        </div>
        <div className="container">
        {renderItems()}
        </div>
      </div>
  );
}

export default Home;