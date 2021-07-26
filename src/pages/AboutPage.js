import React from "react";
import styled from "styled-components";
import { PageHero } from "../components";
import aboutImg from "../assets/hero-bcg.jpg";

const AboutPage = () => {
  return (
    <main>
      <PageHero title="about" />

      <Wrapper className="page section section-center">
        <img src={aboutImg} alt="two people walking and laughing" />
        <article>
          <div className="title">
            <h2>Our Story</h2>
            <div className="underline"></div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
              accusantium animi vitae at commodi veniam dolore voluptatum ut
              excepturi omnis? Natus necessitatibus libero labore, quam eos
              laboriosam vel minus et aspernatur iure debitis ducimus dolor
              iusto ipsum aliquid expedita animi quaerat! Cumque soluta
              necessitatibus, asperiores ea magnam veritatis distinctio atque.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
              accusantium animi vitae at commodi veniam dolore voluptatum ut
              excepturi omnis? Natus necessitatibus libero labore, quam eos
              laboriosam vel minus et aspernatur iure debitis ducimus dolor
              iusto ipsum aliquid expedita animi quaerat! Cumque soluta
              necessitatibus, asperiores ea magnam veritatis distinctio atque.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
              accusantium animi vitae at commodi veniam dolore voluptatum ut
              excepturi omnis? Natus necessitatibus libero labore, quam eos
              laboriosam vel minus et aspernatur iure debitis ducimus dolor
              iusto ipsum aliquid expedita animi quaerat! Cumque soluta
              necessitatibus, asperiores ea magnam veritatis distinctio atque.
            </p>
          </div>
        </article>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 800px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;
export default AboutPage;
