import { useState } from 'react'
import ContentLoader from "react-content-loader"
import cl from './Card.module.scss';

const Card = (
  {
    id,
    name,
    price,
    imgUrl,
    onCart,
    onFavorite,
    favorited = false,
    added = false,
    loading = false
  }
) => {
  const [isAdded, setIsAdded] = useState(added);
  const [isFavorite, setIsFavorite] = useState(favorited);

  const addInCart = () => {
    onCart({id, name, price, imgUrl})
    setIsAdded(!isAdded);
  }

  const addInFavorite= () => {
    onFavorite({id, name, price, imgUrl})
    setIsFavorite(!isFavorite)
  }
  return(
    <div className={cl.Card}>
      {
        loading ? 
          <ContentLoader 
          speed={2}
          width={150}
          height={190}
          viewBox="0 0 150 190"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="90" /> 
          <rect x="0" y="103" rx="3" ry="3" width="150" height="15" /> 
          <rect x="0" y="157" rx="8" ry="8" width="80" height="24" /> 
          <rect x="0" y="125" rx="3" ry="3" width="93" height="15" /> 
          <rect x="118" y="153" rx="8" ry="8" width="32" height="32" />
        </ContentLoader>
      :
      <>
        <div className={cl.favorite}>
          <img 
            src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"} 
            alt="unliked favorite"
            onClick={addInFavorite}
          />
          </div>
          <img width={133} height={112} src={imgUrl} alt="card" />
          <p>{name}</p>
          <div className={cl.CardFooter}>
            <div className={cl.CardFooterText}>
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            <img onClick={addInCart} className={cl.CardBtn} src={!isAdded ? "/img/btn-unchecked.svg" : "/img/btn-checked.svg"} alt="add" />
        </div>
      </>
      }
    </div>
  );
} 

export default Card;