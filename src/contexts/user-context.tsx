import { createContext, ReactNode, useEffect, useState } from 'react';

const loginEnv = import.meta.env.VITE_LOGIN;
const passwordEnv = import.meta.env.VITE_PASSWORD;

type Credentials = {
	userName: string;
	password: string;
};

type UserContextProviderProps = {
	children: ReactNode;
};

type UserContextProps = {
	isLogged: boolean;
	onLogout(): void;
	onLogin(credentials: Credentials): void;
};

export const UserContext = createContext({} as UserContextProps);

export function UserProvider({ children }: UserContextProviderProps) {
	const [isLogged, setIsLogged] = useState(false);

	const onLogin = ({ userName, password }: Credentials) => {
		if (!userName || !password) return alert('Usuário ou Senha vazia');

		if (userName === loginEnv && password === passwordEnv) {
			localStorage.setItem('credentials', JSON.stringify({ userName, password }));
			setIsLogged(true);
		} else {
			alert('Credenciais inválidas. Tente novamente.');
		}
	};

	const onLogout = () => {
		localStorage.removeItem('credentials');
		setIsLogged(false);
	};

	useEffect(() => {
		const getCred = localStorage.getItem('credentials');

		const parseCred = getCred && JSON.parse(getCred);

		if (parseCred && parseCred.userName === loginEnv && parseCred.password === passwordEnv) {
			setIsLogged(true);
		} else {
			setIsLogged(false);
		}
	}, [isLogged, setIsLogged]);

	return <UserContext.Provider value={{ isLogged, onLogin, onLogout }}>{children}</UserContext.Provider>;
}
