import React, { useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
//usercontext not necessary as we already have structure. We can just use the Auth0 hook. Can Import hook and check values.

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
	const { loginWithRedirect, logout, user } = useAuth0();

	//not setting up reducer as there is only one state value:
	const [myUser, setMyUser] = useState(null);

	/* during initial render and everytime user changes, set user to user coming from Auth0 */
	useEffect(() => {
		setMyUser(user);
	}, [user]);

	//this is so that other components can use login and logout functions and myUser state:
	return (
		<UserContext.Provider value={{ loginWithRedirect, logout, myUser }}>
			{children}
		</UserContext.Provider>
	);
};
// make sure use
export const useUserContext = () => {
	return useContext(UserContext);
};
