import { useState, useEffect } from 'react'
import { HStack, Tag, TagLabel, TagLeftIcon, Text } from '@chakra-ui/react'

import { Icons } from '../../icons'
import { formatTime } from '../../../utils/format-time'

type NumberProps = {
	number: string
	timePaused: number
}

export const Number = ({ number, timePaused }: NumberProps) => {
	const [time, setTime] = useState(timePaused)

	useEffect(() => {
		if (time > 0) {
			const interval = setInterval(() => {
				setTime(prevTime => prevTime - 1000) // Decrement by 1 second (1000 ms)
			}, 1000)

			return () => {
				clearInterval(interval)
			}
		}
	}, [time])

	return (
		<HStack spacing="4">
			<Tag w="180px">
				<TagLeftIcon fontSize="1.4rem" as={Icons.Clock} />
				<TagLabel>{number}</TagLabel>
			</Tag>

			<Text sx={{ rounded: 4, bg: 'red.50', color: 'gray.900' }}>
				Time:{' '}
				<Text color="red.500" as="span">
					{formatTime(time)}
				</Text>
			</Text>
		</HStack>
	)
}
