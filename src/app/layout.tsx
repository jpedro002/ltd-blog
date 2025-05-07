import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import type React from 'react'
import './globals.css'
import { Header } from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Bits-Of-C0de',
	description: 'Explore Learn Build - A coding blog',
	generator: 'v0.dev',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt" suppressHydrationWarning>
			<body
				className={`${inter.className} min-h-screen flex flex-col  antialiased`}
				suppressHydrationWarning
			>
				<Header />
				{children}
			</body>
		</html>
	)
}
