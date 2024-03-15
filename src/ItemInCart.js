import React from 'react';
import { useSelector } from 'react-redux';
import './ItemInCart.css';

function ItemInCart() {
  const result = useSelector(output => output.product.cart);

  return (
    <div>
      <div className="modal fade" id="cartModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Items In Cart</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="item-container">
                {result.map((item, index) => (
                  <div key={index} className="item">
                    <img className="item-image" src={item.image} alt="Item" />
                    <div className="item-details">
                      <h6 className="item-title">{item.title}</h6>
                      <p className="item-price">Price: ${item.price}</p>
                      <p className="item-quantity">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemInCart;
