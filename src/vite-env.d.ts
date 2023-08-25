/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_LOGIN: string
	readonly VITE_PASSWORD: string
	readonly VITE_PORT: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
