'use client';

import { ReactNode } from 'react';

import { ThemeProvider as NextThemeProvider } from 'next-themes';

interface ThemeProviderProps {
	children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
	return (
		<NextThemeProvider attribute='class' defaultTheme='system' enableSystem>
			{children}
		</NextThemeProvider>
	);
}
