import React, { useState,useEffect} from 'react';
import { useSelector } from 'react-redux';
import ItemInCart from './ItemInCart';
import Category from './Category';
import { menWear, womenWear, jewelery, electronics } from './redux.js';
import Axios from 'axios';
function Navbar() {
    const len = useSelector(output => output.product.cart);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [product , setProducts] = useState("");

    useEffect(() => {
        Axios.get('https://fakestoreapi.com/products')
            .then((response) => {                
                setProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'rgba(133, 47, 193, 0.8)', color: 'white' }}>
                <div className="container-fluid">
                    <h1 style={{ margin: '0' }}>Portion Store</h1>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{marginLeft: "727px"}}>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                CATEGORY
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" data-toggle="modal" data-target="#categoryModal" onClick={() => setSelectedCategory("men's clothing")}>Men's Clothing</a>
                                    <a className="dropdown-item" data-toggle="modal" data-target="#categoryModal" onClick={() => setSelectedCategory("women's clothing")}>Women's Clothing</a>
                                    <a className="dropdown-item" data-toggle="modal" data-target="#categoryModal"  onClick={() => setSelectedCategory("jewelery")}>Jewelery</a>
                                    <a className="dropdown-item" data-toggle="modal" data-target="#categoryModal"  onClick={() => setSelectedCategory("electronics")}>Electronics</a>
                                </div>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit" style={{ backgroundColor: 'rgba(47, 193, 124, 0.8)', color: 'white', marginRight: '10px' }}>Search</button>
                            <div style={{ position: 'relative', display: 'inline-block', marginLeft: '10px', cursor: 'pointer' }}>
                                <img width="50px" src={process.env.PUBLIC_URL + 'add_to_part.jpg'} style={{ cursor: "pointer" }} data-toggle="modal" data-target="#cartModal" />
                                <div id="cartCount" style={{ position: 'absolute', top: '-10px', right: '-10px', backgroundColor: 'red', borderRadius: '50%', width: '20px', height: '20px', textAlign: 'center', color: 'white', fontSize: '14px', lineHeight: '20px' }}>{len.length}</div>
                            </div>
                        </form>
                    </div>
                </div>
            </nav>
            {selectedCategory && <Category type={selectedCategory} result={product}/>}
            <ItemInCart />
        </div>
    );
}

export default Navbar;
