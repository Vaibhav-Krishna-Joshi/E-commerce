import React, { createContext, useState } from "react";
import all_products from "../Components/Assets/all_product";
import Item from "../Components/Item/Item";


export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < all_products.length+1; index++){
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart())
    
    const addToCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        // console.log(cartItems);
    } 
    const removeFromCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }
    const getTotalCartAmount = () =>{
        let totalAmount = 0;
        // console.log(all_products)
        for(const item in cartItems){

            // console.log(item)
            if(cartItems[item]>0)
                {
                    console.log(item)
                    let itemInfo = all_products.find((product)=>product.id===Number(item))
                    console.log(itemInfo)
                    totalAmount += itemInfo.new_price * cartItems[item];
                }
        }
        return totalAmount;
        // console.log(totalAmount)
    }
    const getTotalCartItems = () =>{
        let totalItem = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    } 
    const contextValue = {getTotalCartItems, getTotalCartAmount, all_products, cartItems, addToCart, removeFromCart}; 
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;