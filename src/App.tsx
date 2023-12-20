import { useState } from 'react';

import { Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { Login } from './components/login';
import { QrCode } from './components/qr-code';
import { useSocket } from './hooks/useSocket';
import { OpenaiKeys } from './components/openai-keys';
import { NumbersPaused } from './components/numbers-paused';
import { PromptEditable } from './components/prompt-editable';

function App() {
	const [isLogged, setIsLogged] = useState(false);
	const { qrCode } = useSocket();

	const noExistsConnection = qrCode !== 'ok';

	function onLogin(value: boolean) {
		if (!value) return;
		setIsLogged(value);
	}

	return (
		<Stack align="center" w="100vw" h="100vh" p="28" spacing="20">
			{!isLogged ? (
				<Login onLogin={onLogin} />
			) : (
				<>
					<Tabs isFitted variant="enclosed">
						<TabList mb="20">
							<Tab>Conexão QRCode</Tab>
							<Tab isDisabled={noExistsConnection}>Openai Keys</Tab>
							<Tab isDisabled={noExistsConnection}>Prompt</Tab>
							<Tab isDisabled={noExistsConnection}>Números Pausados</Tab>
						</TabList>
						<TabPanels display="flex" justifyContent="center">
							<TabPanel>
								<QrCode />
							</TabPanel>
							<TabPanel>
								<OpenaiKeys />
							</TabPanel>
							<TabPanel>
								<PromptEditable />
							</TabPanel>
							<TabPanel>
								<NumbersPaused />
							</TabPanel>
						</TabPanels>
					</Tabs>
				</>
			)}
		</Stack>
	);
}

export default App;
