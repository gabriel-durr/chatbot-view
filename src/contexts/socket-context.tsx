/* eslint-disable @typescript-eslint/no-explicit-any */
import io from 'socket.io-client';

import { ReactNode, createContext, useState, useCallback, useEffect } from 'react';

type KeysProps = {
	active: boolean;
	value: string;
	__v: number;
	_id: string;
};

type SocketProviderProps = {
	children: ReactNode;
};

type SocketContextProps = {
	qrCode?: string;
	keysResult?: KeysProps[];
	timePaused?: number;
	promptResult?: string;
	numbersPausedResult?: string[];
	executeMethod(methodName: string, arg1?: string, arg2?: string): void;
};

export const SocketContext = createContext({} as SocketContextProps);

const socket = io(import.meta.env.VITE_BOT_API_URL);

export const SocketProvider = ({ children }: SocketProviderProps) => {
	const [qrCode, setQrCode] = useState();
	const [keysResult, setKeysResult] = useState();
	const [promptResult, setPromptResult] = useState();
	const [timePaused, setTimePaused] = useState();
	const [numbersPausedResult, setNumbersPausedResult] = useState();

	const executeMethod = useCallback((methodName: string, arg1?: string, arg2?: string) => {
		socket.emit('execute-method', methodName, arg1, arg2);
	}, []);

	useEffect(() => {
		socket.on('qr-code', (result) => {
			setQrCode(result);
		});

		socket.on('keys-result', (result) => {
			setKeysResult(result);
		});

		socket.on('prompt-result', (result) => {
			setPromptResult(result.content);
		});

		socket.on('time-paused-resut', (result) => {
			setTimePaused(result);
		});

		socket.on('numbers-pauseds-result', (result) => {
			setNumbersPausedResult(result);
		});

		return () => {
			socket.off('qr-code');
			socket.off('keys-result');
			socket.off('prompt-result');
			socket.off('time-paused-resut');
			socket.off('numbers-pauseds-result');
		};
	}, [qrCode, keysResult, promptResult, timePaused, numbersPausedResult]);

	return <SocketContext.Provider value={{ qrCode, numbersPausedResult, keysResult, timePaused, promptResult, executeMethod }}>{children}</SocketContext.Provider>;
};
