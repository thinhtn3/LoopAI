# Frontend Directory Structure

This document outlines the organization of the frontend codebase.

## Directory Overview

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── common/         # Common components (Button, Input, etc.)
│   └── layout/         # Layout components (Header, Footer, etc.)
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── services/           # API services and external integrations
├── context/            # React Context providers
├── types/              # TypeScript type definitions (if using TS)
├── styles/             # Additional CSS/SCSS files
├── constants/          # Application constants
└── lib/                # Third-party library configurations
```

## Component Organization

### UI Components (`components/ui/`)
- shadcn/ui components go here
- Use: `npx shadcn@latest add [component-name]`

### Common Components (`components/common/`)
- Reusable components used across multiple pages
- Examples: CustomButton, CustomInput, Modal, etc.

### Layout Components (`components/layout/`)
- Components that define page structure
- Examples: Header, Footer, Sidebar, Navigation

## File Naming Conventions

- **Components**: PascalCase (e.g., `UserProfile.jsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useTheme.js`)
- **Utilities**: camelCase (e.g., `helpers.js`)
- **Constants**: UPPER_SNAKE_CASE in constants file
- **Services**: camelCase (e.g., `api.js`)

## Import Patterns

```jsx
// Components
import { Button } from '@/components/ui/button'
import Layout from '@/components/layout/Layout'

// Hooks
import { useTheme } from '@/hooks/useTheme'

// Utilities
import { formatDate } from '@/utils/helpers'

// Constants
import { API_BASE_URL } from '@/constants'

// Services
import { userApi } from '@/services/api'
```

## Best Practices

1. **Keep components small and focused**
2. **Use custom hooks for complex logic**
3. **Centralize API calls in services**
4. **Store constants in dedicated files**
5. **Follow the established naming conventions**
6. **Use the `@/` alias for imports**

## Adding New Components

1. Create the component file in the appropriate directory
2. Export the component as default or named export
3. Import and use in your pages
4. Add to this README if it's a significant addition
