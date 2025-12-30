import { useCallback, useEffect, useState } from 'react';

const THEMES = {
  DARK: 'dark',
  LIGHT: 'retro',
} as const;

type Theme = (typeof THEMES)[keyof typeof THEMES];

const LS_KEY = 'theme';
const DEFAULT_THEME: Theme = THEMES.DARK;

function getInitialTheme(): Theme {
  const saved = localStorage.getItem(LS_KEY) as Theme | null;
  if (saved) return saved;

  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches;
  return prefersDark ? THEMES.DARK : DEFAULT_THEME;
}

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(LS_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT));
  }, []);

  return (
    <button
      type='button'
      onClick={toggleTheme}
      aria-label={`Switch theme (current: ${theme})`}
      title={theme === THEMES.DARK ? 'Dark mode' : 'Light mode'}
      className='btn btn-ghost btn-sm btn-circle tooltip tooltip-bottom'
      data-tip={theme === THEMES.DARK ? 'Dark' : 'Light'}>
      {theme === THEMES.DARK ? (
        <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 24 24' fill='none' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z' />
        </svg>
      ) : (
        <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 24 24' fill='none' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 3v4M19 3v4M4 11h4M16 11h4M5 21v-4M19 21v-4M8 8l8 8' />
        </svg>
      )}
    </button>
  );
}
