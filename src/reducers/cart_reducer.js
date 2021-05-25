import {
	ADD_TO_CART,
	CLEAR_CART,
	COUNT_CART_TOTALS,
	REMOVE_CART_ITEM,
	TOGGLE_CART_ITEM_AMOUNT,
} from '../actions';

const cart_reducer = (state, action) => {
	if (action.type === ADD_TO_CART) {
		const { id, color, amount, product } = action.payload;
		// check if item is already in the cart. When setting up ID in cart combine color & ID
		const tempItem = state.cart.find((i) => i.id === id + color);
		//if item is already in the cart, I just want to increase that amount.
		if (tempItem) {
			//We iterate over the cart, check where the item is (by checking id is equal to id+color)
			const tempCart = state.cart.map((cartItem) => {
				if (cartItem.id === id + color) {
					let newAmount = cartItem.amount + amount;
					// check against stock
					if (newAmount > cartItem.max) {
						newAmount = cartItem.max;
					}
					return { ...cartItem, amount: newAmount };
				} else {
					return cartItem;
				}
			});

			return { ...state, cart: tempCart };
		} else {
			//if item not already in cart, create new item and add it to cart
			const newItem = {
				id: id + color,
				name: product.name,
				color,
				amount,
				image: product.images[0].url,
				price: product.price,
				max: product.stock,
			};
			return { ...state, cart: [...state.cart, newItem] };
		}
	}

	if (action.type === REMOVE_CART_ITEM) {
		//for each item in state, if item id doesnt match payload (where id is sitting), then return it.
		const tempCart = state.cart.filter((item) => item.id !== action.payload);
		return { ...state, cart: tempCart };
	}

	//clear cart : return empty array.
	if (action.type === CLEAR_CART) {
		return { ...state, cart: [] };
	}
	//toggle item amounts
	if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
		const { id, value } = action.payload;
		const tempCart = state.cart.map((item) => {
			//id is already id + color
			if (item.id === id) {
				if (value === 'inc') {
					let newAmount = item.amount + 1;
					if (newAmount > item.max) {
						newAmount = item.max;
					}
					return { ...item, amount: newAmount };
				}
				if (value === 'dec') {
					let newAmount = item.amount - 1;
					if (newAmount < 1) {
						newAmount = 1;
					}
					return { ...item, amount: newAmount };
				}
			} else return item;
		});

		return { ...state, cart: tempCart };
	}
	//reduce function reduces our array to a single value, can be anything, even object.
	//1st parameter - total of all calculations, 2nd parameter - current iteration / value
	if (action.type === COUNT_CART_TOTALS) {
		const { total_items, total_amount } = state.cart.reduce(
			(total, cartItem) => {
				const { amount, price } = cartItem;
				//count items
				total.total_items += amount;
				// count sum
				total.total_amount += price * amount;

				//always return total(name of 1st parameter) otherwise functionality will break
				//total will be an object
				return total;
			},
			//reduce function: here you provide initial/default value:
			{
				total_items: 0,
				total_amount: 0,
			}
		);
		return { ...state, total_items, total_amount };
	}

	throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
