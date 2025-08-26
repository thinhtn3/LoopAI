import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/ide', label: 'IDE', icon: '💻' },
    { path: '/interview', label: 'Interview', icon: '🎯' },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="flex space-x-1">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            isActive(item.path)
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          }`}
        >
          <span className="mr-2">{item.icon}</span>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
