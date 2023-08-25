import { useState } from 'react'

import {
	Input,
	Editable,
	EditablePreview,
	EditableTextarea as RootEditableTextarea
} from '@chakra-ui/react'

import { EditableControls } from './editable-controls'

type EditableTextareaProps = { content: string; executeMethod(arg1: string, arg2: string): void }

export const EditableTextarea = ({ content, executeMethod }: EditableTextareaProps) => {
	const [value, setValue] = useState('')

	function handleSubmit() {
		executeMethod('updatePrompt', value)
	}

	return (
		<Editable textAlign="center" defaultValue={content} fontSize="2xl" isPreviewFocusable={false}>
			<EditablePreview
				maxW="700px"
				maxH="300px"
				noOfLines={5}
				overflowY="hidden"
				fontSize=".98rem"
				textAlign="start"
			/>
			<Input
				as={RootEditableTextarea}
				minH="300px"
				minW="700px"
				textAlign="start"
				value={value}
				onChange={e => setValue(e.target.value)}
			/>
			<EditableControls handleSubmit={handleSubmit} />
		</Editable>
	)
}
