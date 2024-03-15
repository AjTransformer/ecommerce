import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from './redux.js';
import './Category.css';

function Category(props) {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(null);

  const categoryItems = props.result.filter(item => item.category === props.type);

  console.log("categoryItems ", categoryItems);

  const addProductToCart = (item) => {
    alert("Item Added To The Card");
    // console.log("item is ", item);
    dispatch(addToCart(item));
  }

  const handleItemClick = (item) => {
    setSelectedItem(item);
  }

  const handleCloseDetails = () => {
    setSelectedItem(null);
}

  return (
    <div>
      {/* Category Modal */}
      <div className="modal fade" id="categoryModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Items In {props.type}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="item-container">
                {categoryItems.map((item, index) => (
                  <div key={index} className="item" onClick={() => handleItemClick(item)}>
                    <img className="item-image" src={item.image} alt="Item" />
                    <div className="item-details">
                      <h6 className="item-title">{item.title}</h6>
                      <p className="item-quantity">Quantity: {item.quantity}</p>
                      <div className="card-actions">
                        <button className="btn-add-to-cart" onClick={(e) => { e.stopPropagation(); addProductToCart(item); }}>Add to Cart</button>
                        <span className="price">${item.price}</span>
                      </div>
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

      {/* Selected Item Modal */}
      {selectedItem && (
                <div className="details-modal">
                    <div className="details-modal-content">
                        <button className="close-btn" onClick={handleCloseDetails}>Close</button>
                        <img src={selectedItem.image} alt={selectedItem.title} />
                        <h3>{selectedItem.title}</h3>
                        <p>{selectedItem.description}</p>
                        <p>Price: ${selectedItem.price}</p>
                        <button className="btn-add-to-cart" onClick={() => addProductToCart(selectedItem)}>Add to Cart</button>
                    </div>
                </div>
            )}
    </div>
  );
}

export default Category;
