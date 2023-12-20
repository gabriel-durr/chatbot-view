import { Heading, Stack, VStack } from '@chakra-ui/react';

import { Number } from './partials/number';
import { useSocket } from '../../hooks/useSocket';
import { PauseController } from './partials/pause-controller';

export const NumbersPaused = () => {
	const { timePaused, numbersPausedResult, executeMethod } = useSocket();

	if (!numbersPausedResult || !timePaused)
		return (
			<Heading as="h2" color="blue.900" fontSize="xl" boxShadow="sm" textTransform="uppercase" textAlign="center" lineHeight="9">
				Não há números pausados
			</Heading>
		);

	return (
		<Stack spacing="12">
			<Heading as="h2" color="blue.900" fontSize="xl" boxShadow="sm" textTransform="uppercase" textAlign="center" lineHeight="9">
				Números Pausados
			</Heading>

			<PauseController timePaused={timePaused} executeMethod={executeMethod} />

			<VStack>
				{numbersPausedResult.map((number) => (
					<Number key={number} number={number} timePaused={timePaused} />
				))}
			</VStack>
		</Stack>
	);
};
