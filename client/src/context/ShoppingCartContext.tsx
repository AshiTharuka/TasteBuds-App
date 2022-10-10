import {createContext, ReactNode,useContext, useState} from "react";
import React from 'react';


type ShoppingCartProviderProps = {
    children: ReactNode
 }
 type cartItems ={
    foodId : number,
    quantity : number,

 }

 type ShoppingCartContext = {
    getItemQuantity : (foodId : number) => number
    increaseCartQuantity : (foodId : number) => void
    decreaseCartQuantity : (foodId : number) => void
    removeFromCart : (foodId : number) => void
 }

const ShoppingCartContext = createContext({} as 
    ShoppingCartContext)

export function useShoppingCart(){
    return useContext(ShoppingCartContext)
}


export function ShoppingCartProvider ({children} : ShoppingCartProviderProps) {
   const [cartItems, setCartItems] = useState<cartItems[]>([])

   function getItemQuantity(foodId : number){
    return cartItems.find(item => item.foodId === foodId)?.quantity || 0 
   }

   function increaseCartQuantity(foodId: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.foodId === foodId) == null) {
        return [...currItems, { foodId, quantity: 1 }]
      } else {
        return currItems.map(item => {
          if (item.foodId === foodId) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function decreaseCartQuantity(foodId: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.foodId === foodId)?.quantity === 1) {
        return currItems.filter(item => item.foodId !== foodId)
      } else {
        return currItems.map(item => {
          if (item.foodId === foodId) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function removeFromCart(id: number) {
    setCartItems(currItems => {
      return currItems.filter(item => item.foodId !== id)
    })
  }


    return (
    <ShoppingCartContext.Provider value={{getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart}}>
        {children}
    </ShoppingCartContext.Provider>
    )
}