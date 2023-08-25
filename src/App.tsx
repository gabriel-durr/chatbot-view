import { useState } from 'react'

import { HStack, Stack, VStack } from '@chakra-ui/react'

import { Login } from './components/login'
import { QrCode } from './components/qr-code'
import { OpenaiKeys } from './components/openai-keys'
import { NumbersPaused } from './components/numbers-paused'
import { PromptEditable } from './components/prompt-editable'

function App() {
	const [isLogged, setIsLogged] = useState(false)

	function onLogin(value: boolean) {
		if (!value) return
		setIsLogged(value)
	}

	return (
		<Stack align="center" w="100vw" h="100vh" p="28" spacing="20">
			{!isLogged ? (
				<Login onLogin={onLogin} />
			) : (
				<>
					<HStack align="start" spacing="20">
						<OpenaiKeys />
						<NumbersPaused />
					</HStack>

					<VStack>
						<QrCode />
						<PromptEditable />
					</VStack>
				</>
			)}
		</Stack>
	)
}

export default App
