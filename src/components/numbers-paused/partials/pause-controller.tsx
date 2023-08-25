import { useState } from 'react'
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'
import {
	Input,
	FormLabel,
	InputGroup,
	IconButton,
	FormControl,
	InputRightElement
} from '@chakra-ui/react'

type PauseControllerProps = {
	timePaused: number
	executeMethod(arg1: string, arg2: string): void
}

export const PauseController = ({ timePaused, executeMethod }: PauseControllerProps) => {
	const [pause, setPause] = useState<number>(Math.floor(timePaused / 60000))

	const handleIncrease = () => {
		const timeAdd = pause + 1

		setPause(timeAdd)
		executeMethod('setPauseTime', String(timeAdd))
	}

	const handleDecrease = () => {
		if (timePaused > 0) {
			const timeDec = pause - 1

			setPause(timeDec)
			executeMethod('setPauseTime', String(timeDec))
		}
	}

	const handleChange = (value: number) => {
		setPause(value)
	}

	return (
		<FormControl display="flex" flexDir="row" alignItems="end">
			<FormLabel whiteSpace="nowrap">Tempo de Pause:</FormLabel>
			<InputGroup>
				<Input
					type="number"
					value={pause}
					onChange={e => handleChange(parseInt(e.target.value))}
					borderRadius="0"
					maxW="180px"
					textAlign="center"
					border="none"
					_focus={{ boxShadow: 'none' }}
				/>
				<InputRightElement width="4.5rem">
					<IconButton
						aria-label="Increase Pause"
						icon={<ChevronUpIcon />}
						size="sm"
						onClick={handleIncrease}
					/>
					<IconButton
						aria-label="Decrease Pause"
						icon={<ChevronDownIcon />}
						size="sm"
						onClick={handleDecrease}
					/>
				</InputRightElement>
			</InputGroup>
		</FormControl>
	)
}
