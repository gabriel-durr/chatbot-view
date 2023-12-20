import { Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { useAuth } from './hooks/useAuth';
import { Login } from './components/login';
import { Header } from './components/header';
import { QrCode } from './components/qr-code';
import { useSocket } from './hooks/useSocket';
import { OpenaiKeys } from './components/openai-keys';
import { NumbersPaused } from './components/numbers-paused';
import { PromptEditable } from './components/prompt-editable';
import { Fragment } from 'react';

function App() {
	const { qrCode } = useSocket();
	const { isLogged, onLogin } = useAuth();

	const noExistsConnection = qrCode !== 'ok';

	return (
		<Fragment>
			{!isLogged ? (
				<Login onLogin={onLogin} />
			) : (
				<Stack align="center" w="100vw" h="100vh" p="28">
					<Header />

					<Tabs isFitted variant="enclosed">
						<TabList mb="24" whiteSpace="nowrap" color="blackAlpha.600">
							<Tab _selected={{ fontWeight: 'bold', color: 'orange.200' }}>Conexão QRCode</Tab>
							<Tab isDisabled={noExistsConnection} _selected={{ fontWeight: 'bold', color: 'orange.200' }}>
								Openai Keys
							</Tab>
							<Tab isDisabled={noExistsConnection} _selected={{ fontWeight: 'bold', color: 'orange.200' }}>
								Prompt
							</Tab>
							<Tab isDisabled={noExistsConnection} _selected={{ fontWeight: 'bold', color: 'orange.200' }}>
								Números Pausados
							</Tab>
						</TabList>
						<TabPanels display="flex" justifyContent="center" minW="container.md">
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
				</Stack>
			)}
		</Fragment>
	);
}

export default App;
