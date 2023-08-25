import { useState } from 'react'

import { Stack, Input, Heading, Button, VStack } from '@chakra-ui/react'

const loginEnv = import.meta.env.VITE_LOGIN
const passwordEnv = import.meta.env.VITE_PASSWORD

type LoginProps = {
	onLogin(value: boolean): void
}

export const Login = ({ onLogin }: LoginProps) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	console.log(loginEnv, passwordEnv)

	const handleLogin = () => {
		if (username === loginEnv && password === passwordEnv) {
			onLogin(true)
		} else {
			alert('Credenciais inválidas. Tente novamente.')
		}
	}

	return (
		<Stack boxSize="500px" padding="8" align="center" spacing="20">
			<Heading as="h2" color="gray.800">
				Login Painel ADM
			</Heading>
			<VStack w="full">
				<Input
					type="text"
					placeholder="Usuário"
					value={username}
					onChange={e => setUsername(e.target.value)}
				/>
				<Input
					type="password"
					placeholder="Senha"
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
			</VStack>
			<Button w="full" colorScheme="green" onClick={handleLogin}>
				Entrar
			</Button>
		</Stack>
	)
}
