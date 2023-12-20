import { useState } from 'react';

import { Stack, Input, Heading, Button, VStack, Flex } from '@chakra-ui/react';

type Credentials = {
	userName: string;
	password: string;
};

type LoginProps = {
	onLogin(credentials: Credentials): void;
};

export function Login({ onLogin }: LoginProps) {
	const [userName, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleOnSubmit = () => {
		onLogin({ userName, password });
	};

	return (
		<Flex flexDir="column" align="center" w="100vw" h="100vh" p="28">
			<Stack boxSize="500px" padding="8" align="center" spacing="20">
				<Heading as="h2" color="gray.800">
					Login Painel ADM
				</Heading>
				<VStack w="full">
					<Input type="text" placeholder="Usuário" value={userName} onChange={(e) => setUsername(e.target.value)} />
					<Input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
				</VStack>
				<Button w="full" colorScheme="green" onClick={handleOnSubmit}>
					Entrar
				</Button>
			</Stack>
		</Flex>
	);
}
