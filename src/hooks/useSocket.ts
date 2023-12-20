// /* eslint-disable @typescript-eslint/no-explicit-any */

import { useContext } from 'react';

import { SocketContext } from '../contexts/socket-context';

export const useSocket = () => {
	const { socket, qrCode, keysResult, numbersPausedResult, timePaused, promptResult, executeMethod } = useContext(SocketContext);

	return { socket, qrCode, keysResult, numbersPausedResult, timePaused, promptResult, executeMethod };
};
