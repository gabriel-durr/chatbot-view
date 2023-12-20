import { VStack, Heading } from '@chakra-ui/react';

import { useSocket } from '../../hooks/useSocket';
import { OpenaiKeyController } from './partials/openai-key-controller';

export const OpenaiKeys = () => {
	const { keysResult } = useSocket();

	if (!keysResult?.length) return <h1>Não há Keys</h1>;

	return (
		<VStack spacing="20">
			<Heading as="h2" color="blue.900" fontSize="xl" boxShadow="sm" textTransform="uppercase" textAlign="center" lineHeight="9">
				Keys de Atendimento
			</Heading>

			<VStack>
				{keysResult.map((key, index) => (
					<OpenaiKeyController key={key._id} keyId={key._id} isActive={key.active} defaultValue={key.value} label={`KEY 0${index + 1}`} />
				))}
			</VStack>
		</VStack>
	);
};
