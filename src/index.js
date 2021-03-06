import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ProductsProvider } from "./context/products_context";
import { FilterProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { UserProvider } from "./context/user_context";
import { Auth0Provider } from "@auth0/auth0-react";

//FilterProvider should be placed inside ProductsProvider because we're trying to get
//info from product into the filter

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_STORE_DOMAIN}
    clientId={process.env.REACT_APP_STORE_CLIENT_ID}
    redirectUri={window.location.origin}
    /* everytime user logs in save it in local storage: */
    cacheLocation="localstorage"
  >
    <UserProvider>
      <ProductsProvider>
        <FilterProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FilterProvider>
      </ProductsProvider>
    </UserProvider>
  </Auth0Provider>,

  document.getElementById("root")
);
