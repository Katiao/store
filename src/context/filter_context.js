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
	sort: 'price-lowest',
	filters: {
		text: '',
		company: 'all',
		category: 'all',
		color: 'all',
		min_price: 0,
		max_price: 0,
		price: 0,
		shipping: false,
	},
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

	useEffect(() => {
		dispatch({ type: FILTER_PRODUCTS });
		dispatch({ type: SORT_PRODUCTS });
	}, [products, state.sort, state.filters]);

	const setGridView = () => {
		dispatch({ type: SET_GRIDVIEW });
	};

	const setListView = () => {
		dispatch({ type: SET_LISTVIEW });
	};

	const updateSort = (e) => {
		//const name = e.target.name;
		const value = e.target.value;
		dispatch({ type: UPDATE_SORT, payload: value });
	};

	const updateFilters = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		//we cannot access the value of buttons using code above therefore we need the next line which gets me text inside button:
		if (name === 'category') {
			value = e.target.textContent;
		}
		dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
	};

	const clearFilters = () => {};

	return (
		<FilterContext.Provider
			value={{
				...state,
				setGridView,
				setListView,
				updateSort,
				updateFilters,
				clearFilters,
			}}>
			{children}
		</FilterContext.Provider>
	);
};
// make sure use
export const useFilterContext = () => {
	return useContext(FilterContext);
};
