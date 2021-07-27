import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { single_product_url as url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from "../components";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SingleProductPage = () => {
  //need useParam hook in order to access the url parameters, in React Router DOM
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
  //need to add error in dependency array because by default it's false, eventually it's true
  //which is when we want to useEffect to take place / navigate to home page
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
  //if (Object.entries(product).length === 0) return null;
  if (!Object.entries(product).length) return null;
  const { id: sku } = product;
  const { fields } = product;
  const { name, price, description, stock, stars, reviews, brand, images } =
    fields;

  return (
    <Wrapper>
      {/* pass in product prop here as well so that we display product link in the PageHero */}
      <PageHero title={name} product />
      <div className="section section-center page">
        <Link to="/products" className="btn">
          back to products
        </Link>
        <div className="product-container">
          <div className="product-center">
            {/*  we have an array of images which we pass in to the product images
		 component */}
            <ProductImages images={images} />
          </div>
          <section className="content">
            <h2>{name}</h2>
            <Stars stars={stars} reviews={reviews} />
            <h5 className="price">{formatPrice(price)}</h5>
            <p className="desc">{description}</p>
            <p className="info">
              <span>Available : {stock > 0 ? "In stock" : "out of stock"}</span>
            </p>
            <p className="info">
              <span>SKU : {sku} </span>
            </p>
            <p className="info">
              <span>Brand : {brand} </span>
            </p>
            <hr />
            {stock > 0 && <AddToCart product={product} />}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-container {
    display: grid;
    gap: 4rem;
  }
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
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      align-items: center;
    }

    .product-container {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }

    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
