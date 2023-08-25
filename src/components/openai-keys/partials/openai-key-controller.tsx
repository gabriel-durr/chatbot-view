import { useState } from 'react'

import {
	Badge,
	Switch,
	Editable,
	FormLabel,
	FormControl,
	EditableInput,
	EditablePreview
} from '@chakra-ui/react'

type OpenaiKeyControllerProps = {
	keyId: string
	label: string
	defaultValue: string
	isActive: boolean
	executeMethod(methodName: string, arg1?: string, arg2?: string): void
}

export const OpenaiKeyController = ({
	keyId,
	label,
	isActive,
	defaultValue,
	executeMethod
}: OpenaiKeyControllerProps) => {
	const [newValue, setWewValue] = useState(defaultValue)

	function handleActiveKey() {
		executeMethod(isActive ? 'deactivateKey' : 'activateKey', keyId)
	}

	function handleUpdateKey() {
		executeMethod('editKeyValue', keyId, newValue)
	}

	return (
		<FormControl display="flex" flexDir="row" gap="4">
			<FormLabel>{`${label}:`}</FormLabel>
			<Editable
				value={newValue}
				onChange={value => setWewValue(value)}
				onKeyDown={event => {
					if (event.key === 'Enter') {
						event.preventDefault()
						handleUpdateKey()
					}
				}}>
				<EditablePreview w="220px" />
				<EditableInput w="220px" />
			</Editable>

			<Badge
				variant="subtle"
				fontSize="0.8em"
				boxSize="max"
				colorScheme={isActive ? 'green' : 'red'}>
				{isActive ? 'Ativo' : 'Inativo'}
			</Badge>

			<Switch
				isChecked={isActive}
				onChange={e => {
					e.preventDefault()
					handleActiveKey()
				}}
			/>
		</FormControl>
	)
}
