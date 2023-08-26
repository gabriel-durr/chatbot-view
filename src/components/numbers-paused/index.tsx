import { useEffect } from 'react'

import { Heading, Stack, VStack } from '@chakra-ui/react'

import { Number } from './partials/number'
import { useSocket } from '../../hooks/useSocket'
import { PauseController } from './partials/pause-controller'

export const NumbersPaused = () => {
	const { timePaused, numbersPausedResult, executeMethod } = useSocket()

	useEffect(() => {
		executeMethod('getPausedNumbers')
		executeMethod('getTimePaused')
	}, [timePaused, numbersPausedResult, executeMethod])

	if (!numbersPausedResult || !timePaused) return <div>Loading ...</div>

	return (
		<Stack spacing="12">
			<Heading as="h2" size="lg">
				Números Pausados
			</Heading>

			<PauseController timePaused={timePaused} executeMethod={executeMethod} />

			<VStack>
				{numbersPausedResult.map(number => (
					<Number key={number} number={number} timePaused={timePaused} />
				))}
			</VStack>
		</Stack>
	)
}
