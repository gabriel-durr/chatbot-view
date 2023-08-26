import { useEffect } from 'react'

import { VStack, Heading } from '@chakra-ui/react'

import { EditableTextarea } from './partials/editable-textarea'
import { useSocket } from '../../hooks/useSocket'

export const PromptEditable = () => {
	const { promptResult, executeMethod } = useSocket()

	useEffect(() => {
		executeMethod('getPrompt')
	}, [promptResult, executeMethod])

	if (!promptResult) return <div>Loading ...</div>

	return (
		<VStack spacing="12">
			<Heading as="h2" size="lg">
				Prompt da IA
			</Heading>
			<EditableTextarea content={promptResult} executeMethod={executeMethod} />
		</VStack>
	)
}
