/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: "rgb(var(--color-primary) / <alpha-value>)",
				bg: "rgb(var(--color-bg) / <alpha-value>)",
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
