/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        extend: {
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.05em', fontWeight: '400' }],
                sm: ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.02em', fontWeight: '400' }],
                base: ['1rem', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],
                lg: ['1.125rem', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '500' }],
                xl: ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.01em', fontWeight: '600' }],
                '2xl': ['1.5rem', { lineHeight: '1.4', letterSpacing: '-0.02em', fontWeight: '700' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.01em', fontWeight: 'bold' }],
                '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.01em', fontWeight: 'bold' }],
                '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '800' }],
                '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.01em', fontWeight: 'bold' }],
                '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.01em', fontWeight: 'bold' }],
                '8xl': ['5.25rem', { lineHeight: '1', letterSpacing: '-0.01em', fontWeight: 'bold' }],
                '9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.05em', fontWeight: '900' }],
            },
            fontFamily: {
                heading: "space grotesk",
                paragraph: "azeret-mono"
            },
            colors: {
                'glass-border': '#273140',
                destructive: '#FF3B3B',
                'destructive-foreground': '#FFFFFF',
                background: '#0B0D10',
                'surface': '#151A21',
                'surface-alt': '#1E2530',
                secondary: '#40E0FF',
                foreground: '#F0EEE9',
                'secondary-foreground': '#FFFFFF',
                'primary-foreground': '#0B0D10',
                primary: '#D4AF37',
                'primary-hover': '#B89B82',
                'tech-accent': '#40E0FF',
                'border-subtle': '#273140',
                'aura-cyan': '#40E0FF',
                'charcoal': '#0B0D10',
                'deepest-black': '#050505',
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
