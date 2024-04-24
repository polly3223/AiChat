import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Geist'],
				mono: ['GeistMono']
			}
		}
	},
	plugins: [typography, forms]
} satisfies Config;

export default config;
