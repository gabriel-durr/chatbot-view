import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';

import App from './App.tsx';
import { UserProvider } from './contexts/user-context.tsx';
import { SocketProvider } from './contexts/socket-context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ChakraProvider>
			<UserProvider>
				<SocketProvider>
					<App />
				</SocketProvider>
			</UserProvider>
		</ChakraProvider>
	</React.StrictMode>
);
