import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/filter_reducer';
import {
	LOAD_PRODUCTS,
	SET_GRIDVIEW,
	SET_LISTVIEW,
	UPDATE_SORT,
	SORT_PRODUCTS,
	UPDATE_FILTERS,
	FILTER_PRODUCTS,
	CLEAR_FILTERS,
} from '../actions';
import { useProductsContext } from './products_context';

const initialState = {
	filtered_products: [],
	all_products: [],
	grid_view: true,
};

const FilterContext = React.createContext();

//information from products context cannot be passed to filter reducer/state directly, need to do it through the FilterProvider component. We'll want to use useEffect: when component mounts, dispatch load product action.

export const FilterProvider = ({ children }) => {
	const { products } = useProductsContext();
	const [state, dispatch] = useReducer(reducer, initialState);
	//this is where we're sending the product information to filter reducer, every time component loads or products array changes(initially it's empty)
	useEffect(() => {
		dispatch({ type: LOAD_PRODUCTS, payload: products });
	}, [products]);

	return (
		<FilterContext.Provider value={{ ...state }}>
			{children}
		</FilterContext.Provider>
	);
};
// make sure use
export const useFilterContext = () => {
	return useContext(FilterContext);
};
