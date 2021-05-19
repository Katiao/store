import {
	LOAD_PRODUCTS,
	SET_LISTVIEW,
	SET_GRIDVIEW,
	UPDATE_SORT,
	SORT_PRODUCTS,
	UPDATE_FILTERS,
	FILTER_PRODUCTS,
	CLEAR_FILTERS,
} from '../actions';

//using spread opearator here because we're copying the value, not referencing to the same place in memory.
//we want payload to be equal to both all products and filter products but we need to use spread operator otherwise once you filter products you cannot go back to default, as JS points to same place in memory.

const filter_reducer = (state, action) => {
	if (action.type === LOAD_PRODUCTS) {
		return {
			...state,
			all_products: [...action.payload],
			filtered_products: [...action.payload],
		};
	}
	throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
