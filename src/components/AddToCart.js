import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { useCartContext } from '../context/cart_context';
import AmountButtons from './AmountButtons';

const AddToCart = ({ product }) => {
	const { addToCart } = useCartContext();
	const { id, stock } = product;
	//state for sizes buttons:
	const sizes = ['XS', 'S', 'M', 'L', 'XL']
	const [mainSize, setMainSize] = useState(sizes[0]);
	//state for amount buttons:
	const [amount, setAmount] = useState(1);

	//in below function user cannot increase amount more than stock amount or less than 1
	const increase = () => {
		setAmount((oldAmount) => {
			let tempAmount = oldAmount + 1;
			if (tempAmount > stock) {
				tempAmount = stock;
			}
			return tempAmount;
		});
	};

	const decrease = () => {
		setAmount((oldAmount) => {
			let tempAmount = oldAmount - 1;
			if (tempAmount < 1) {
				tempAmount = 1;
			}
			return tempAmount;
		});
	};

	return (
		<Wrapper>
			<div className='colors'>
				<span> size: </span>
				<div>
					{/* for each color return a button, background color added dynamically, if the color is the same as the main color, it gets the class of active (half opacity in css) and gets a checkmark  */}
					 {sizes.map((size, index) => {
						return (
							<button
								key={index}
								//style={{ background: color }}
								className={`${
									mainSize === size ? 'color-btn active' : 'color-btn'
								}`}
								onClick={() => setMainSize(size)}> {size}
								
							</button>
						);
					})} 
				</div>
			</div>
			<div className='btn-container'>
				<AmountButtons
					amount={amount}
					increase={increase}
					decrease={decrease}
				/>
				<Link
					to='/cart'
					className='btn'
					onClick={() => addToCart(id, amount, product)}>
					add to cart
				</Link>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	margin-top: 2rem;
	.colors {
		display: grid;
		grid-template-columns: 125px 1fr;
		align-items: center;
		margin-bottom: 1rem;
		span {
			text-transform: capitalize;
			font-weight: 700;
		}
		div {
			display: flex;
		}
	}
	.color-btn {
		display: inline-block;
		width: 1.8rem;
		height: 1.8rem;
		border-radius: 50%;
		background: #222;
		color: white;
		margin-right: 0.5rem;
		border: none;
		cursor: pointer;
		opacity: 0.5;
		display: flex;
		align-items: center;
		justify-content: center;
		svg {
			font-size: 0.75rem;
			color: var(--clr-white);
		}
	}
	.active {
		opacity: 1;
	}
	.btn-container {
		margin-top: 2rem;
	}

	.btn {
		margin-top: 1rem;
		width: 140px;
	}
`;
export default AddToCart;
