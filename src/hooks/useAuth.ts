import { useContext } from 'react';
import { UserContext } from '../contexts/user-context';

export const useAuth = () => {
	const { isLogged, onLogin, onLogout } = useContext(UserContext);

	return { isLogged, onLogin, onLogout };
};
