import { useInterviewTheme } from '../../context/InterviewThemeContext';

export default function ThemeSelector() {
  const { currentTheme, theme, themes, setTheme, toggleTheme, setSystemThemeMode } = useInterviewTheme();

  return (
    <div className="flex items-center space-x-2 p-2 bg-surface border border-border rounded-md">
      <span className="text-xs text-textSecondary">Theme:</span>
      
      <select
        value={currentTheme}
        onChange={(e) => setTheme(e.target.value)}
        className="text-xs bg-background text-text border border-border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-accent"
      >
        {themes.map((themeKey) => (
          <option key={themeKey} value={themeKey}>
            {themes[themeKey]?.name || themeKey}
          </option>
        ))}
      </select>
      
      <button
        onClick={toggleTheme}
        className="p-1 text-textSecondary hover:text-text transition-colors"
        title="Toggle theme"
      >
        {currentTheme.includes('dark') ? '☀️' : '🌙'}
      </button>
      
      <button
        onClick={setSystemThemeMode}
        className="p-1 text-textSecondary hover:text-text transition-colors"
        title="Use system theme"
      >
        💻
      </button>
    </div>
  );
}
