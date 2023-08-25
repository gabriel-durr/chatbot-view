import { useEffect } from 'react'

import QRCode from 'react-qr-code'
import { Box, Button, Heading, VStack, Text, Stack } from '@chakra-ui/react'

import { useSocket } from '../../hooks/useSocket'

export const QrCode = () => {
	const { qrCode, executeMethod } = useSocket()

	function handleRemoveAuth() {
		executeMethod('remove-auth')
	}

	useEffect(() => {
		console.log(qrCode)
		executeMethod('qrCode')
	}, [])

	return (
		<Stack spacing="12">
			<Heading as="h2" size="lg">
				QR Code de conexão
			</Heading>
			<VStack spacing="12">
				<Box
					display="flex"
					alignItems="center"
					justifyContent="center"
					padding="1"
					pos="relative"
					bg="blackAlpha.50"
					boxSize="320px"
					border="1px dotted #b5adad">
					{qrCode ? (
						<QRCode value={qrCode} />
					) : (
						<Text fontSize="1.4rem" color="black">
							Aparelho Conectado.
						</Text>
					)}
				</Box>

				<Button w="200px" colorScheme="red" onClick={handleRemoveAuth}>
					Remover Conexão
				</Button>
			</VStack>
		</Stack>
	)
}
