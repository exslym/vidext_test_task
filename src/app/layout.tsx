import { ThemeProvider } from '@/components/ThemesProvider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

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
					<TrpcProvider>{children}</TrpcProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
