import { useTheme as useThemeState } from 'next-themes';
import { useEffect, useState } from 'react';

type UseThemeProps = {
  theme?: string;
  setTheme: (theme: string) => void;
  toggleTheme: () => void;
  isMounted: boolean;
};

export default function useTheme(): UseThemeProps {
  const { theme, setTheme } = useThemeState();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleTheme = () => {
    if (!theme) return;
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return { theme, setTheme, toggleTheme, isMounted };
}