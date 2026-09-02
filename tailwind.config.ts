import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ground: '#0A0B0D',
        raised: '#101216',
        panel: '#0E1013',
        line: '#1D1F24',
        'line-soft': '#17191D',
        edge: '#2A2D34',
        ink: '#F2F1EC',
        muted: '#9A9CA3',
        dim: '#6B6E76',
        faint: '#4E5158',
        accent: '#C7F04B',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Space Grotesk', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'IBM Plex Sans', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      maxWidth: { shell: '1140px' },
    },
  },
  plugins: [],
};
export default config;
