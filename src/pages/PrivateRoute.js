import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
//this component ensures that when user is not logged in and tries to access checkout by using URL, they will be redirected to home page.

//children refers to whatever is in private route (see app.js) which we'll want to return
//rest operator used in function parameter, gathers everything passed in private route parent.
const PrivateRoute = ({ children, ...rest }) => {
	//we're accessing user directly from useAuth0 hook not from context.
	const { user } = useAuth0();
	//spread operator: spread out props gathered in rest above.
	//if user exists, grab children (checkout), if not, return redirect
	return (
		<Route
			{...rest}
			render={() => {
				return user ? children : <Redirect to='/'></Redirect>;
			}}></Route>
	);
};
export default PrivateRoute;
