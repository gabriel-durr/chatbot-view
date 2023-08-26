/* eslint-disable @typescript-eslint/no-explicit-any */
import io from 'socket.io-client'

import { ReactNode, createContext, useState } from 'react'

type SocketProviderProps = {
	children: ReactNode
}

type SocketContextProps = {
	qrCode?: string
	keysResult?: any
	timePaused?: number
	promptResult?: string
	numbersPausedResult?: string[]
	executeMethod(methodName: string, arg1?: string, arg2?: string): void
}

export const SocketContext = createContext({} as SocketContextProps)

const socket = io(import.meta.env.VITE_PORT)

export const SocketProvider = ({ children }: SocketProviderProps) => {
	const [qrCode, setQrCode] = useState()
	const [keysResult, setKeysResult] = useState()
	const [promptResult, setPromptResult] = useState()
	const [timePaused, setTimePaused] = useState()
	const [numbersPausedResult, setNumbersPausedResult] = useState()

	socket.on('numbers-pauseds-result', async resultMethod => {
		setNumbersPausedResult(resultMethod)
	})

	socket.on('time-paused-resut', async resultMethod => {
		setTimePaused(resultMethod)
	})

	socket.on('keys-result', async resultMethod => {
		setKeysResult(resultMethod)
	})

	socket.on('prompt-result', async resultMethod => {
		setPromptResult(resultMethod)
	})

	if (!qrCode) {
		socket.on('qr-code', resultMethod => {
			setQrCode(resultMethod)
		})
	}

	const executeMethod = async (methodName: string, arg1?: string, arg2?: string) => {
		socket.emit('execute-method', methodName, arg1, arg2)
	}

	return (
		<SocketContext.Provider
			value={{ qrCode, numbersPausedResult, keysResult, timePaused, promptResult, executeMethod }}>
			{children}
		</SocketContext.Provider>
	)
}
