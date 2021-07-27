import React, { useState } from "react";
import styled from "styled-components";

//since we have a main image we set up the useState / state value.
//initially the images are undefined that's why we set up default params.
//if images are undefined, we set it as an empty array with empty url param, to avoid error:
//ES6 Default parameters
const ProductImages = ({ images = [{ url: "" }] }) => {
  const [main, setMain] = useState(images[0]);
  return (
    <Wrapper>
      <img src={main.url} alt="main" className="main" />
      <div className="gallery">
        {images.map((image, index) => {
          const { url, filename } = image;
          return (
            <img
              src={url}
              alt={filename}
              key={index}
              //onclick changes the main image, based on index of particular image.
              onClick={() => setMain(images[index])}
              //if image url matches url that is coming from the main, add active class:
              className={`${url === main.url ? "active" : null}`}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .main {
    height: 700px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: contain;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    border: 2px solid var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .main {
      height: 700px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 800px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`;

export default ProductImages;
