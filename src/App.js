import { useEffect, useState } from "react";
import {Routes, Route} from 'react-router-dom';

import axios from 'axios';
import AppContext from './context';

import Header from "./components/Header";
import Drawer from "./components/Drawer";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [serchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    async function fetchData() {
      const favoritesResponse = await axios.get('https://619e2b77131c6000170893d0.mockapi.io/favorites');
      const cartResponse = await axios.get('https://619e2b77131c6000170893d0.mockapi.io/cart');
      const itemsResponse = await axios.get('https://619e2b77131c6000170893d0.mockapi.io/items');

      setIsLoading(false);
      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }

    fetchData()
  }, [])


  const addToCart = (obj) => {
    try {
      if (cartItems.find(item => Number(item.id) === Number(obj.id))){
        axios.delete(`https://619e2b77131c6000170893d0.mockapi.io/cart/${obj.id}`);
        setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
      } else{ 
        axios.post('https://619e2b77131c6000170893d0.mockapi.io/cart', obj);
        setCartItems(prev => [...prev, obj]);
      }
      
    } catch (error) {
      alert('Не удалось добавить товар в корзину!')
    }
  }

  const removeFromCart = (id) => {
    axios.delete(`https://619e2b77131c6000170893d0.mockapi.io/cart/${id}`);
    setCartItems(prev => prev.filter(item => item.id !== id));
  }

  const addToFavorites = async (obj) => {
    try {
      if(favorites.find(item => item.id === obj.id)){
        axios.delete(`https://619e2b77131c6000170893d0.mockapi.io/favorites/${obj.id}`);
      } else {
        const {data} = await axios.post('https://619e2b77131c6000170893d0.mockapi.io/favorites', obj);
        setFavorites(prev => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в закладки!');
    }
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const itog = () => {
    let totalPrice = 0;
    for (let item of cartItems)
      totalPrice += +item.price;
    return totalPrice;
  }

  
  return (
    <AppContext.Provider value={{items, cartItems, favorites}}>
      <div className="wrapper">
      {cartOpened && 
        <Drawer 
          items={cartItems} 
          onClickCartClose={() => setCartOpened(false)}
          onRemove={removeFromCart}
          totalPrice={itog}
        />
      }
      <Header 
        onClickCart={() => setCartOpened(true)}
        totalPrice={itog}
      />
      <Routes>
        <Route
          path="/" 
          element={
            <Home
              items={items}
              setItems={setItems}
              serchValue={serchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              addToCart={addToCart}
              addToFavorites={addToFavorites}
              cartItems={cartItems}
              isLoading={isLoading}
            />
          }/>
          <Route 
            path="favorites" 
            element={
              <Favorites
                addToFavorites={addToFavorites}
              />
            }
          />
      </Routes>
    </div>
    </AppContext.Provider>
  );
}

export default App;
