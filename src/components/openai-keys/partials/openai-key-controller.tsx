import { useState } from 'react';

import { Badge, Switch, Editable, FormLabel, FormControl, EditableInput, EditablePreview } from '@chakra-ui/react';

import { useSocket } from '../../../hooks/useSocket';

type OpenaiKeyControllerProps = {
	keyId: string;
	label: string;
	defaultValue: string;
	isActive: boolean;
};

export const OpenaiKeyController = ({ keyId, label, isActive, defaultValue }: OpenaiKeyControllerProps) => {
	const { executeMethod } = useSocket();

	const [newValue, setWewValue] = useState(defaultValue);

	function handleActiveKey() {
		executeMethod(isActive ? 'deactivateKey' : 'activateKey', keyId);
	}

	function handleUpdateKey() {
		executeMethod('editKeyValue', keyId, newValue);
	}

	return (
		<FormControl display="flex" flexDir="row" gap="4">
			<FormLabel>{`${label}:`}</FormLabel>
			<Editable
				value={newValue}
				noOfLines={1}
				onChange={(value) => setWewValue(value)}
				onKeyDown={(event) => {
					if (event.key === 'Enter') {
						event.preventDefault();
						handleUpdateKey();
					}
				}}>
				<EditablePreview noOfLines={1} w="220px" />
				<EditableInput />
			</Editable>

			<Badge variant="subtle" fontSize="0.8em" boxSize="max" colorScheme={isActive ? 'green' : 'red'}>
				{isActive ? 'Ativo' : 'Inativo'}
			</Badge>

			<Switch
				isChecked={isActive}
				onChange={(e) => {
					e.preventDefault();
					handleActiveKey();
				}}
			/>
		</FormControl>
	);
};
