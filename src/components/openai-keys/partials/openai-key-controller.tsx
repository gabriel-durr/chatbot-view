import { useState } from 'react';

import { Badge, Switch, Editable, FormLabel, FormControl, EditableInput, EditablePreview } from '@chakra-ui/react';

import { useSocket } from '../../../hooks/useSocket';

type OpenaiKeyControllerProps = {
	keyId: string;
	label: string;
	defaultValue: string;
	isActive: boolean;
};

export function OpenaiKeyController({ keyId, label, isActive, defaultValue }: OpenaiKeyControllerProps) {
	const [newValue, setWewValue] = useState(defaultValue);

	const { executeMethod } = useSocket();

	const handleActiveKey = () => {
		executeMethod(isActive ? 'deactivateKey' : 'activateKey', keyId);
	};

	const handleUpdateKey = () => {
		executeMethod('editKeyValue', keyId, newValue);
	};

	return (
		<FormControl display="flex" flexDir="row" gap="4">
			<FormLabel>{`${label}:`}</FormLabel>
			<Editable
				value={newValue}
				onChange={(value) => setWewValue(value)}
				onKeyDown={(event) => {
					if (event.key === 'Enter') {
						event.preventDefault();
						handleUpdateKey();
					}
				}}>
				<EditablePreview w="220px" noOfLines={1} whiteSpace="nowrap" />
				<EditableInput w="220px" />
			</Editable>

			<Badge variant="subtle" fontSize="0.8em" boxSize="max" colorScheme={isActive ? 'green' : 'red'}>
				{isActive ? 'Ativo' : 'Inativo'}
			</Badge>

			<Switch isChecked={isActive} onChange={handleActiveKey} />
		</FormControl>
	);
}
