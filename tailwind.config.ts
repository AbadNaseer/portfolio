import type { Config } from 'tailwindcss';

/*  The previous config extended three things and the components then invented
 *  31 arbitrary font sizes, 9 line heights and 15 hex literals between them.
 *  Everything a component needs is now a token, and `text-[...]` is banned. */

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        sunk: 'var(--paper-sunk)',
        rule: 'var(--rule)',
        'rule-strong': 'var(--rule-strong)',
        ink: 'var(--ink)',
        'ink-2': 'var(--ink-2)',
        'ink-3': 'var(--ink-3)',
        mark: 'var(--mark)',
        'mark-wash': 'var(--mark-wash)',
      },
      fontFamily: {
        // "Source Serif 4" must stay quoted: a bare `4` is not a valid CSS
        // identifier, and one invalid family name invalidates the entire
        // font-family declaration, so the browser silently drops it.
        serif: ['var(--font-serif)', '"Source Serif 4"', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      // A 1.25 ratio off a 17px base, rounded to whole pixels. Ten sizes, and
      // the display sizes carry their own tracking so nothing needs tweaking
      // at the call site.
      fontSize: {
        '2xs': ['11px', { lineHeight: '1.45', letterSpacing: '0.09em' }],
        xs:    ['13px', { lineHeight: '1.5' }],
        sm:    ['15px', { lineHeight: '1.6' }],
        base:  ['17px', { lineHeight: '1.65' }],
        lg:    ['21px', { lineHeight: '1.5' }],
        xl:    ['26px', { lineHeight: '1.3', letterSpacing: '-0.005em' }],
        '2xl': ['33px', { lineHeight: '1.22', letterSpacing: '-0.01em' }],
        '3xl': ['42px', { lineHeight: '1.15', letterSpacing: '-0.012em' }],
        '4xl': ['53px', { lineHeight: '1.08', letterSpacing: '-0.016em' }],
        '5xl': ['66px', { lineHeight: '1.02', letterSpacing: '-0.021em' }],
      },
      maxWidth: { shell: '1120px', measure: 'var(--measure)' },
      transitionTimingFunction: { out: 'var(--ease-out)' },
      transitionDuration: { quick: 'var(--dur-quick)', slow: 'var(--dur-slow)' },
    },
  },
  plugins: [],
};
export default config;
