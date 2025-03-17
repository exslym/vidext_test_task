import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import { ThemeProvider } from '@/components/ThemesProvider';

import TrpcProvider from './_utils/TrpcProvider';
import './globals.css';

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter',
});

export const metadata: Metadata = {
	title: 'Tldraw Editor',
	description: 'A simple and powerful drawing editor',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={inter.className}>
				<ThemeProvider>
					<TrpcProvider>
						{children}
						<Toaster
							position='bottom-right'
							toastOptions={{
								className: 'toaster',
								duration: 3000,
								removeDelay: 1000,
								success: {
									iconTheme: {
										primary: 'green',
										secondary: 'white',
									},
								},
								error: {
									iconTheme: {
										primary: 'red',
										secondary: 'white',
									},
								},
							}}
						/>
					</TrpcProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
