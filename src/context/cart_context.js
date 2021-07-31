import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../actions";

//check whether we have item in local storage, if we do, set up cart equal to that and not empty array.
const getLocalStorage = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    //we stored it as a string so now we want to parse it back:
    return JSON.parse(localStorage.getItem("cart"));
  } else {
    return [];
  }
};

const initialState = {
  cart: getLocalStorage(),
  total_items: 0,
  //this is total dollar amount:
  total_amount: 0,
  shipping_fee: 550,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //add to cart
  const addToCart = (id, size, amount, product) => {
    dispatch({ type: ADD_TO_CART, payload: { id, size, amount, product } });
  };

  // remove item
  const removeItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  };

  // toggle amount
  const toggleAmount = (id, value) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
  };

  //clear cart
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  //local storage: useEffect invoked everytime there is a change in the cart. Can only store strings in local storage.
  //added to this useEffect: everytime cart changes, update totals in multiple places
  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS });
    //setting key and value in local storage:
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeItem, toggleAmount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
