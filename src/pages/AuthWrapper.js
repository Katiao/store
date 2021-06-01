import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
//this component is to fix the issue that when user is logged in and navigates to checkout page via typing in URL it takes us back to home page (due to PrivateRoute component)
//component will wrap all routes in App.js.
//this will wrap entire app (children)
//this will give our app enough time in private route to check for users, so we don't redirect to homepage right away.

const AuthWrapper = ({ children }) => {
	const { isLoading, error } = useAuth0();
	if (isLoading) {
		return (
			<Wrapper>
				<h1>Loading...</h1>
			</Wrapper>
		);
	}
	if (error) {
		return (
			<Wrapper>
				<h1>{error.message}</h1>
			</Wrapper>
		);
	}
	//if everything is correct we display children
	return <>{children}</>;
};

const Wrapper = styled.section`
	min-height: 100vh;
	display: grid;
	place-items: center;
`;

export default AuthWrapper;
