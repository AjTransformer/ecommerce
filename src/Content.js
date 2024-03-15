import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, addProducts } from './redux.js';
import './Content.css';

function Content() {
    const dispatch = useDispatch();
    const storeData = useSelector(state => state.product.products);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        Axios.get('https://fakestoreapi.com/products')
            .then((response) => {
                dispatch(addProducts(response.data));
                //dispatch(findCatagory(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }, [dispatch]);

    const addProductToCart = (item) => {
        alert("Item Added To The Card");
    // console.log("item is ", item);
        dispatch(addToCart(item));
    }

    const handleCardClick = (item) => {
        setSelectedItem(item);
    }

    const handleCloseDetails = () => {
        setSelectedItem(null);
    }

    return (
        <div className="content-container">
            {storeData.map((item) => (
                <div className="card" key={item.id} onClick={() => handleCardClick(item)}>
                    <img className="card-image" src={item.image} alt={item.title} />
                    <div className="card-content">
                        <h3 className="card-title">{item.title}</h3>
                        <p className="card-description">{item.description}</p>
                        <div className="card-actions">
                            <button className="btn-add-to-cart" onClick={(e) => { e.stopPropagation(); addProductToCart(item); }}>Add to Cart</button>
                            <span className="price">${item.price}</span>
                        </div>
                    </div>
                </div>
            ))}
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

export default Content;
