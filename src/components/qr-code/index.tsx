import QRCode from 'react-qr-code';

import { Box, Button, Heading, VStack, Text, Stack, CircularProgress, CircularProgressLabel } from '@chakra-ui/react';

import { useSocket } from '../../hooks/useSocket';
import { WpMotion } from '../../animations/wp-motion';

export const QrCode = () => {
	const { qrCode, executeMethod } = useSocket();

	function handleRemoveAuth() {
		executeMethod('remove-auth');
	}

	const noExistsConnection = qrCode !== 'ok';

	return (
		<Stack spacing="12">
			<Heading as="h2" color="blue.900" fontSize="xl" boxShadow="sm" textTransform="uppercase" textAlign="center" lineHeight="9">
				QR Code de conexão
			</Heading>
			<VStack spacing="12">
				<Box display="flex" alignItems="center" justifyContent="center" padding="0.5" pos="relative" bg={noExistsConnection ? 'blackAlpha.50' : 'gray.50'} boxSize="320px" rounded="sm" shadow="md">
					{qrCode === 'ok' ? (
						<VStack>
							<WpMotion boxSize="200px" />
							<Text fontSize="1.4rem" textShadow="0px 0px 70px black" bgGradient="linear-gradient(90deg, #FFA500, #77e277)" backgroundClip="text" color="transparent" fontWeight="medium">
								Aparelho Conectado.
							</Text>
						</VStack>
					) : qrCode ? (
						<QRCode value={qrCode} style={{ height: 'auto', maxWidth: '100%', width: '100%' }} />
					) : (
						<CircularProgress isIndeterminate color="green.300">
							<CircularProgressLabel>...</CircularProgressLabel>
						</CircularProgress>
					)}
				</Box>

				<Button w="200px" colorScheme="red" onClick={handleRemoveAuth} isDisabled={noExistsConnection}>
					Remover Conexão
				</Button>
			</VStack>
		</Stack>
	);
};
