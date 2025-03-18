import { Toaster } from 'react-hot-toast';
import '@/app/globals.css';
import { ThemeProvider } from '@/app/providers/ThemesProvider';
import TrpcProvider from '@/app/providers/TrpcProvider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

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
