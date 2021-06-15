import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useProductsContext } from '../context/products_context';
import { single_product_url as url } from '../utils/constants';
import { formatPrice } from '../utils/helpers';
import {
	Loading,
	Error,
	ProductImages,
	AddToCart,
	Stars,
	PageHero,
} from '../components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SingleProductPage = () => {
	const { id } = useParams();
	const history = useHistory();
	const {
		single_product_loading: loading,
		single_product_error: error,
		single_product: product,
		fetchSingleProduct,
	} = useProductsContext();

	//when I load the page / useEffect, when component mounts or ID changes:

	useEffect(() => {
		fetchSingleProduct(`${url}${id}`);
		//eslint-disable-next-line
	}, [id]);
	//set up automatic navigation back to home page if there is an error in 3 secs:
	//we can navigate away from page using useHistory hook
	useEffect(() => {
		if (error) {
			setTimeout(() => {
				history.push(`/`);
			}, 3000);
		}
		//eslint-disable-next-line
	}, [error]);
	if (loading) {
		return <Loading />;
	}
	if (error) {
		return <Error />;
	}
	const {id: sku } = product
	const {
		name,
		price,
		description,
		stock,
		stars,
		reviews,
		brand,
		images,
	} = product.fields
	//console.log(product)
	return (
		<Wrapper>
			<PageHero title={name} product />
			<div className='section section-center page'>
				<Link to='/products' className='btn'>
					back to products
				</Link>
				<div className='product-center'>
					{/* we have an array of images which we pass in to the product images component */}
					<ProductImages images={images} />
				</div>
				<section className='content'>
					<h2>{name}</h2>
					<Stars stars={stars} reviews={reviews} />
					<h5 className='price'>{formatPrice(price)}</h5>
					<p className='desc'>{description}</p>
					<p className='info'>
						<span> Available : {stock > 0 ? 'In stock' : 'out of stock'} </span>
					</p>
					<p className='info'>
						<span>SKU : {sku} </span>
					</p>
					<p className='info'>
						<span>Brand : {brand} </span>
					</p>
					<hr />
					{stock > 0 && <AddToCart product={product} />}
				</section>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.main`
	.product-center {
		display: grid;
		gap: 4rem;
		margin-top: 2rem;
	}
	.price {
		color: var(--clr-primary-5);
	}
	.desc {
		line-height: 2;
		max-width: 45em;
	}
	.info {
		text-transform: capitalize;
		width: 300px;
		display: grid;
		grid-template-columns: 125px 1fr;
		span {
			font-weight: 700;
		}
	}

	@media (min-width: 992px) {
		.product-center {
			grid-template-columns: 1fr 1fr;
			align-items: center;
		}
		.price {
			font-size: 1.25rem;
		}
	}
`;

export default SingleProductPage;
