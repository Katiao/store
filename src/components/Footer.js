import React from "react";
import styled from "styled-components";
const Footer = () => {
  return (
    <Wrapper>
      <h5>FairClothing</h5>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--clr-black);
  text-align: center;

  h5 {
    color: var(--clr-primary-5);
    margin: 0.1rem;
    font-weight: 400;
    line-height: 1.25;
  }
`;

export default Footer;
