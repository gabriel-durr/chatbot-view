import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'

import App from './App.tsx'
import { SocketProvider } from './contexts/socket-context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ChakraProvider>
			<SocketProvider>
				<App />
			</SocketProvider>
		</ChakraProvider>
	</React.StrictMode>
)
