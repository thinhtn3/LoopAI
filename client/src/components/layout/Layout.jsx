import Navigation from './Navigation';
import { useTheme } from '../../context/ThemeContext';

export default function Layout({ children }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: 'var(--home-bg)', color: 'var(--home-text)' }}>
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Mock AI</h1>
            <div className="flex items-center space-x-4">
              <Navigation />
            </div>
          </div>
        </div>
      </header>
      
      <main>
        {children}
      </main>
      
      {/* <footer className="border-t mt-auto">
        <div className="container mx-auto px-4 py-4 text-center text-muted-foreground">
          <p>&copy; 2024 Mock AI. Built with React, Tailwind CSS, and shadcn/ui.</p>
        </div>
      </footer> */}
    </div>
  );
}
