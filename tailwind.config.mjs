/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'cyan-primary': 'var(--color-cyan-primary)',
				'orange-primary': 'var(--color-orange-primary)',
				'green-primary': 'var(--color-green-primary)',
				primary: "rgb(var(--color-primary) / <alpha-value>)",
				bg: "rgb(var(--color-bg) / <alpha-value>)",
				"bg-card": "rgb(var(--color-bg-card) / <alpha-value>)",
				text: "rgb(var(--color-text) / <alpha-value>)",
				success: "rgb(var(--color-success) / <alpha-value>)",
				info: "rgb(var(--color-info) / <alpha-value>)",
				warn: "rgb(var(--color-warn) / <alpha-value>)",
				error: "rgb(var(--color-error) / <alpha-value>)",
				transparent: "transparent",
				current: "currentColor",
			},
			fontFamily: {
				montserrat: ['"Montserrat Variable"', ...defaultTheme.fontFamily.sans]
			}
		},
	},
	plugins: [],
	darkMode: 'selector',
}
