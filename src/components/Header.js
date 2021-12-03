import {Link} from 'react-router-dom';


const Header = ({onClickCart, totalPrice}) => {
  return (
    <header>
      <Link to="/">
        <div className="headerLeft">
          <img src="/img/logo.png" alt="logo" />
          <div>
            <h3>REACT SNEAKERS</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="headerRight">
        <li>
          <img onClick={onClickCart} src="/img/cart.svg" alt="cart" />
          <span>{totalPrice()} руб.</span>
        </li>
        <li>
          <Link to="/favorites">
            <img src="/img/like.svg" alt="like" />
          </Link>
        </li>
        <li>
          <img src="/img/user.svg" alt="user" />
        </li>
      </ul>
    </header>
  );
}

export default Header;
