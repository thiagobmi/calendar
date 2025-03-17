import { useState, useEffect } from 'react';

export function useDarkMode() {
  const [darkMode, setDarkMode] = useState(false);

  // Função para alternar entre os modos
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  // Atualiza o DOM quando o modo escuro muda
  useEffect(() => {
    const updateTheme = () => {
      if (darkMode) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('ec-dark');
        document.body.style.backgroundColor = '#22272e';
        document.body.style.color = '#adbac7';
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('ec-dark');
        document.body.style.backgroundColor = '#ffffff';
        document.body.style.color = '#212529';
      }
    };

    updateTheme();
  }, [darkMode]);

  // Detecta a preferência do sistema ao montar o componente
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);

    // Adiciona listener para mudanças na preferência do sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return { darkMode, toggleDarkMode };
}