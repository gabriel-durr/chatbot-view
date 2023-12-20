import { useRef } from 'react';

import { Logout3 } from 'solar-icon-set';

import { IconButton, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button, useDisclosure } from '@chakra-ui/react';
import { useAuth } from '../../hooks/useAuth';

export function AlertLogout() {
	const cancelRef = useRef(null);
	const { onLogout } = useAuth();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleOnSubmit = () => {
		onClose();
		onLogout();
	};

	return (
		<>
			<IconButton size="xs" color="red.400" icon={<Logout3 size={28} iconStyle="BoldDuotone" />} aria-label="Button: Logout" onClick={onOpen} />

			<AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Confirmação Logout
						</AlertDialogHeader>

						<AlertDialogBody>Tem certeza que deseja sair da conta? será necessário fazer login novamente.</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} bg="red.200" _hover={{ bg: 'red.300' }} color="red.900" onClick={onClose}>
								Cancelar
							</Button>
							<Button colorScheme="green" ml={3} bg="green.400" _hover={{ bg: 'green.500' }} color="green.50" onClick={handleOnSubmit}>
								Confirmar
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
}
