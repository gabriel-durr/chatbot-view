/* eslint-disable @typescript-eslint/no-explicit-any */
import { io, Socket } from 'socket.io-client';

import { ReactNode, createContext, useState, useEffect } from 'react';

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
	socket: Socket;
	qrCode?: string;
	keysResult?: KeysProps[];
	timePaused?: number;
	promptResult?: string;
	numbersPausedResult?: string[];
	executeMethod(methodName: string, arg1?: string, arg2?: string): void;
};
const socket = io(import.meta.env.VITE_BOT_API_URL);

export const SocketContext = createContext({} as SocketContextProps);

export const SocketProvider = ({ children }: SocketProviderProps) => {
	const [promptResult, setPromptResult] = useState();
	const [qrCode, setQrCode] = useState<SocketContextProps['qrCode']>();
	const [timePaused, setTimePaused] = useState<SocketContextProps['timePaused']>();
	const [keysResult, setKeysResult] = useState<SocketContextProps['keysResult']>([]);
	const [numbersPausedResult, setNumbersPausedResult] = useState<SocketContextProps['numbersPausedResult']>([]);

	useEffect(() => {
		socket.connect();

		return () => {
			socket.disconnect();
		};
	}, []);

	useEffect(() => {
		const onQrStatus = (qrStatus: any) => {
			setQrCode(qrStatus);
		};

		const onKeys = (keysResult: any) => {
			setKeysResult(keysResult);
		};

		const onPrompt = (promptResult: any) => {
			setPromptResult(promptResult.content);
		};

		const onTimePaused = (pausedResult: any) => {
			setTimePaused(pausedResult);
		};

		const onNumbersPauseds = (numbersPausedes: any) => {
			setNumbersPausedResult(numbersPausedes);
		};

		socket.on('qr-code', onQrStatus);

		socket.on('keys-result', onKeys);

		socket.on('prompt-result', onPrompt);

		socket.on('time-paused-resut', onTimePaused);

		socket.on('numbers-pauseds-result', onNumbersPauseds);

		return () => {
			socket.off('qr-code', onQrStatus);
			socket.off('keys-result', onKeys);
			socket.off('prompt-result', onPrompt);
			socket.off('time-paused-resut', onTimePaused);
			socket.off('numbers-pauseds-result', onNumbersPauseds);
		};
	}, []);

	const executeMethod = (methodName: string, arg1?: string, arg2?: string) => {
		socket.emit('execute-method', methodName, arg1, arg2);
	};

	console.log({ qrCode, keysResult, promptResult, timePaused, numbersPausedResult });

	return (
		<SocketContext.Provider
			value={{
				socket,
				qrCode,
				keysResult,
				timePaused,
				promptResult,
				executeMethod,
				numbersPausedResult,
			}}>
			{children}
		</SocketContext.Provider>
	);
};
