const Cart = ({onClickCartClose, items, onRemove, totalPrice}) => {

  return(
    <div className="overlay">
      <div className="cart">
        <h2>
          Корзина
          <img onClick={onClickCartClose} src="/img/btn-remove.svg" alt="remove" />
        </h2>
          {
            items.length > 0 ?
            <div>
              <div className="cartItems">
              {
                items.map(item => (
                  <div key={item.id} className="cartItem">
                        <img className="cartImg" src={item.imgUrl} alt="card" />
                        <div className="cartText">
                          <p>
                            {item.name}
                          </p>
                          <span>{item.price} руб.</span>
                        </div>
                        <img onClick={() => onRemove(item.id)} className="cartBtnRemove" src="/img/btn-remove.svg" alt="remove"  />
                      </div>
                ))
              }
            </div>

              <ul className="cartTotalBlock">
          <li>
            <p>Итого: </p>
            <div></div>
            <b>{totalPrice()} руб.</b>
          </li>
          <li>
            <p>Налог 5%: </p>
            <div></div>
            <b>1074 руб.  </b>
          </li>
        <button className="greenBtn">
          Оформить заказ
          <img src="/img/arrow.svg" alt="arrow" />
        </button>
        </ul>
            </div>
            :
            <div className="cartEmpty">
                <img width={120} height={120} src="/img/cart-empty.jpg" alt="cart empty" />
                <div className="cartEmptyText">
                  <b>Корзина пустая</b>
                  <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
                </div>
                  <button onClick={onClickCartClose} className="greenBtn">
                    <img src="/img/arrow.svg" alt="arrow" />
                    Вернуться назад
                  </button>
                </div>
          }
      </div>
    </div>
  );
}

export default Cart;