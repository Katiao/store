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
		//mapping through each product in payload and get all prices. Cannot pass array in max method so use spread operator
		let maxPrice = action.payload.map((p) => p.price);
		maxPrice = Math.max(...maxPrice);
		return {
			...state,
			all_products: [...action.payload],
			filtered_products: [...action.payload],
			filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
		};
	}

	if (action.type === SET_GRIDVIEW) {
		return { ...state, grid_view: true };
	}

	if (action.type === SET_LISTVIEW) {
		return { ...state, grid_view: false };
	}

	if (action.type === UPDATE_SORT) {
		return { ...state, sort: action.payload };
	}

	if (action.type === SORT_PRODUCTS) {
		const { sort, filtered_products } = state;
		let tempProducts = [...filtered_products];
		if (sort === 'price-lowest') {
			//a is current item b is next product, we're comparing their price
			tempProducts = tempProducts.sort((a, b) => a.price - b.price);
		}
		if (sort === 'price-highest') {
			tempProducts = tempProducts.sort((a, b) => b.price - a.price);
		}
		if (sort === 'name-a') {
			tempProducts = tempProducts.sort((a, b) => {
				return a.name.localeCompare(b.name);
			});
		}
		if (sort === 'name-z') {
			tempProducts = tempProducts.sort((a, b) => {
				return b.name.localeCompare(a.name);
			});
		}
		return { ...state, filtered_products: tempProducts };
	}
	if (action.type === UPDATE_FILTERS) {
		//passing in payload as an object so need to distructure them here.
		const { name, value } = action.payload;
		// since filters is an object, I'm saying, whatever name value I'm passing in access that property and set it to this value dynamically:
		return { ...state, filters: { ...state.filters, [name]: value } };
	}
	if (action.type === FILTER_PRODUCTS) {
		const { all_products } = state;
		const { text, category, company, color, price, shipping } = state.filters;
		//before I filter anything I always start with a fresh copy of all the products. Always need access to default data, so that for eg. if there is no text it falls back to showing all default products.
		let tempProducts = [...all_products];
		//filtering text
		if (text) {
			tempProducts = tempProducts.filter((product) => {
				return product.name.toLowerCase().startsWith(text);
			});
		}
		//filtering category
		if (category !== 'all') {
			tempProducts = tempProducts.filter(
				//for that product, check if product's category matches state category.
				(product) => product.category === category
			);
		}

		//filtering company
		if (company !== 'all') {
			tempProducts = tempProducts.filter(
				//for that product, check if product's company matches state company.
				(product) => product.company === company
			);
		}

		//filtering colors
		//gotcha with colors as it's an array.
		if (color !== 'all') {
			tempProducts = tempProducts.filter((product) => {
				//product is an array and product.color is also an array
				//I run find method on colors array, check if color matches color coming from the state.
				return product.colors.find((c) => c === color);
			});
		}

		//filtering price
		//if product price property is less or equal to price coming from my state, then return those products.
		tempProducts = tempProducts.filter((product) => product.price <= price);

		//filtering shipping
		// if shipping (state) is true, return the products that have the shipping property to true.
		if (shipping) {
			tempProducts = tempProducts.filter(
				(product) => product.shipping === true
			);
		}

		//returning state after all filters above are done. Returning all products if conditions above are not met.
		return { ...state, filtered_products: tempProducts };
	}
	if (action.type === CLEAR_FILTERS) {
		return {
			...state,
			filters: {
				//we're copying the values and overriding some of them. we want the price to stay the same when we clear filters.
				...state.filters,
				text: '',
				company: 'all',
				category: 'all',
				color: 'all',
				price: state.filters.max_price,
				shipping: false,
			},
		};
	}

	throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
