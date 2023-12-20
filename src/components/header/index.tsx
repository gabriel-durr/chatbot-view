import { HStack, Text } from '@chakra-ui/react';

import { Icons } from '../icons';
import { AlertLogout } from './alert-logout';

export function Header() {
	return (
		<HStack pos="fixed" top="0" w="full" h="10" bg="blackAlpha.200" justify="space-evenly">
			<HStack>
				<Icons.Bot width="32px" />
				<Text as="span" fontSize="xs" _after={{ content: "'v2'", fontSize: 14, color: 'orange.500', fontWeight: 300, textTransform: 'uppercase' }}>
					Chatbot View
				</Text>
			</HStack>
			<AlertLogout />
		</HStack>
	);
}
