import { useEffect, useState } from 'react'

import { VStack, Heading } from '@chakra-ui/react'

import { useSocket } from '../../hooks/useSocket'
import { OpenaiKeyController } from './partials/openai-key-controller'

type KeysProps = {
	active: boolean
	value: string
	__v: number
	_id: string
}

export const OpenaiKeys = () => {
	const [keys, setKeys] = useState<KeysProps[]>([])

	const { executeMethod, keysResult } = useSocket()

	useEffect(() => {
		executeMethod('getKeys')

		setKeys(keysResult)
	}, [executeMethod, keys, keysResult])

	if (!keys) return <div>Carregando...</div>

	return (
		<VStack spacing="12">
			<Heading as="h2" size="lg">
				Keys de Atendimento
			</Heading>

			<VStack>
				{keys.map((key, index) => (
					<OpenaiKeyController
						key={key._id}
						keyId={key._id}
						isActive={key.active}
						defaultValue={key.value}
						label={`KEY 0${index + 1}`}
						executeMethod={executeMethod}
					/>
				))}
			</VStack>
		</VStack>
	)
}
