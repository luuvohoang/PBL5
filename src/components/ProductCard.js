import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleAddToCart = async (e) => {
        e.preventDefault(); // Prevent navigation when clicking the button
        if (!user) {
            alert('Please login to add items to cart');
            navigate('/login');
            return;
        }
        try {
            const result = await addToCart(product);
            console.log('Added to cart:', result);
            alert('Product added to cart successfully!');
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert(error.response?.data || 'Failed to add product to cart');
        }
    };

    const displayPrice = product.sale
        ? product.price * (1 - product.sale.discountPercent / 100)
        : product.price;
        // console.log('sale: ', product.sale.discountPercent);
        // : product.price;

    return (
        <Link to={`/product/${product.id}`} className="card product-card">
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div className="price-container">
                {product.sale && (
                    <span className="original-price">${product.price.toFixed(2)}</span>
                )}
                <p className="price">${displayPrice.toFixed(2)}</p>
                {product.sale && (
                    <span className="discount-badge">-{product.sale.discountPercent}%</span>
                )}
            </div>
            <p>Stock: {product.stockQuantity}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </Link>
    );
};

export default ProductCard;
