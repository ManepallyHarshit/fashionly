/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        extend: {
            fontSize: {
                xs: ["0.75rem", { lineHeight: "1.2", letterSpacing: "0.02em", fontWeight: "400" }],
                sm: ["0.875rem", { lineHeight: "1.3", letterSpacing: "0.02em", fontWeight: "400" }],
                base: ["1rem", { lineHeight: "1.5", letterSpacing: "0.025em", fontWeight: "400" }],
                lg: ["1.125rem", { lineHeight: "1.5", letterSpacing: "0.025em", fontWeight: "500" }],
                xl: ["1.25rem", { lineHeight: "1.5", letterSpacing: "0.025em", fontWeight: "600" }],
                "2xl": ["1.5rem", { lineHeight: "1.4", letterSpacing: "0.02em", fontWeight: "600" }],
                "3xl": ["1.875rem", { lineHeight: "1.3", letterSpacing: "0", fontWeight: "700" }],
                "4xl": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "700" }],
                "5xl": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800" }],
                "6xl": ["3.75rem", { lineHeight: "1", letterSpacing: "-0.03em", fontWeight: "800" }],
                "7xl": ["4.5rem", { lineHeight: "1", letterSpacing: "-0.04em", fontWeight: "900" }],
                "8xl": ["6rem", { lineHeight: "1", letterSpacing: "-0.05em", fontWeight: "900" }],
                "9xl": ["8rem", { lineHeight: "1", letterSpacing: "-0.06em", fontWeight: "900" }],
            },
            fontFamily: {
                heading: ["poppins-v2"],
                paragraph: ["poppins-v2"]
            },
            colors: {
                "glass-border": "#0E2A35",
                destructive: "#DF3131",
                "destructive-foreground": "#ffffff",
                background: "#D0FBF9",
                surface: "#FFFFFF",
                "surface-alt": "#fafafa",
                secondary: "#FFF8D1",
                foreground: "#0E2A35",
                "secondary-foreground": "#0E2A35",
                "primary-foreground": "#FFFFFF",
                primary: "#0E2A35",
                "primary-hover": "#0A212A",
                "tech-accent": "#0E2A35",
                "border-subtle": "#B3D1CF",
                "aura-cyan": "#0E2A35",
                charcoal: "#D0FBF9",
                "deepest-black": "#D0FBF9",
                destructiveforeground: "#ffffff",
                backgrounddark: "#D0FBF9",
                accentbluelight: "#0A212A",
                accentyellow: "#FFF8D1",
                accentcyan: "#D0FBF9"
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
