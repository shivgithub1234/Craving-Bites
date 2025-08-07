import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({ image, name, price, desc , id }) => {

    const [itemCount, setItemCount] = useState(0);
    const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext);

    
    const getImageSrc = () => {
        
        if (typeof image === 'string') {
            // If the string does NOT start with 'http', '/', or 'blob:' and ends with an image extension, use backend
            if (
                (image.endsWith('.jpg') || image.endsWith('.png') || image.endsWith('.jpeg') || image.endsWith('.webp')) &&
                !image.startsWith('http') && !image.startsWith('/') && !image.startsWith('blob:')
            ) {
                return url + "/images/" + image;
            }
            
            return image;
        }
       
        return image;
    };

    // Fallback image (logo) if image fails to load
    const handleImgError = (e) => {
        e.target.onerror = null;
        e.target.src = assets.logo;
    };

    return (
        <div className='food-item'>
            <div className='food-item-img-container'>
                <img className='food-item-image' src={getImageSrc()} alt={name} onError={handleImgError} />
                {!cartItems[id]
                ?<img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
                :<div className="food-item-counter">
                        <img src={assets.remove_icon_red} onClick={()=>removeFromCart(id)} alt="" />
                        <p>{cartItems[id]}</p>
                        <img src={assets.add_icon_green} onClick={()=>addToCart(id)} alt="" />
                    </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p> <img src={assets.rating_starts} alt="" />
                </div>
                <p className="food-item-desc">{desc}</p>
                <p className="food-item-price">${price}</p>
            </div>
        </div>
    )
}

export default FoodItem
