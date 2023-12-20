import { VStack, Heading } from '@chakra-ui/react';

import { useSocket } from '../../hooks/useSocket';
import { EditableTextarea } from './partials/editable-textarea';

export const PromptEditable = () => {
	const { promptResult, executeMethod } = useSocket();

	const defaultEmpety = 'Nenhum Prompt registrado, você deve criar um nesse campo para os bots funcionarem corretamente 🧭';

	if (!promptResult) return <EditableTextarea content={defaultEmpety} executeMethod={executeMethod} />;

	return (
		<VStack spacing="12">
			<Heading as="h2" color="blue.900" fontSize="xl" boxShadow="sm" textTransform="uppercase" textAlign="center" lineHeight="9">
				Prompt utilizado pela IA
			</Heading>
			<EditableTextarea content={promptResult} executeMethod={executeMethod} />
		</VStack>
	);
};
