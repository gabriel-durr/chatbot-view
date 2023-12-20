import QRCode from 'react-qr-code';

import { Box, Button, Heading, VStack, Text, Stack, CircularProgress, CircularProgressLabel } from '@chakra-ui/react';

import { Icons } from '../icons';
import { useSocket } from '../../hooks/useSocket';

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
				<Box display="flex" alignItems="center" justifyContent="center" padding="0.5" pos="relative" bg="blackAlpha.50" boxSize="320px" border="1px dotted #b5adad">
					{qrCode === 'ok' ? (
						<Text fontSize="1.4rem" color="black">
							<Icons.PhoneConnected />
							Aparelho Conectado.
						</Text>
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
