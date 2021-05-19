import React from 'react';
import styled from 'styled-components';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
const Stars = ({ stars, reviews }) => {
	/* If number of stars more or equal to 1, display full star, otherwise if no. of stars more or equal to .5, display half star otherwise display empty star. Repeat 5 times as we have 5 stars, increase values by one each time*/

	//create a new array. First item will be undefined so we add unserscore.
	const tempStars = Array.from({ length: 5 }, (_, index) => {
		//index is from 0 to 4
		const number = index + 0.5;
		return (
			<span key={index}>
				{/* if stars are bigger then index + 1 because index starts at 0 */}
				{stars >= index + 1 ? (
					<BsStarFill />
				) : stars >= number ? (
					<BsStarHalf />
				) : (
					<BsStar />
				)}
			</span>
		);
	});

	return (
		<Wrapper>
			<div className='stars'>{tempStars}</div>
			<p className='reviews'>({reviews} customer reviews)</p>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	span {
		color: #ffb900;
		font-size: 1rem;
		margin-right: 0.25rem;
	}
	p {
		margin-left: 0.5rem;
		margin-bottom: 0;
	}
	margin-bottom: 0.5rem;
`;
export default Stars;
