# Folder Structure Optimization Plan

## Current Issues
- Mixed component organization
- Some components are too large (monolithic)
- Lack of clear separation of concerns
- No clear feature-based grouping

## Optimized Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/             # Base UI components (Button, Card, etc.)
│   ├── common/           # Shared components (Loading, ErrorBoundary, etc.)
│   └── layout/           # Layout components (Header, Footer, etc.)
├── features/            # Feature-specific components
│   ├── auth/           # Authentication related
│   │   ├── components/   # Auth-specific components
│   │   ├── hooks/        # Auth hooks
│   │   └── services/     # Auth services
│   ├── prayer/         # Prayer times and related
│   │   ├── components/   # Prayer components
│   │   ├── hooks/        # Prayer hooks
│   │   └── services/     # Prayer services
│   ├── quran/          # Quran reading and related
│   │   ├── components/   # Quran components
│   │   ├── hooks/        # Quran hooks
│   │   └── services/     # Quran services
│   ├── hadith/         # Hadith collection and related
│   │   ├── components/   # Hadith components
│   │   ├── hooks/        # Hadith hooks
│   │   └── services/     # Hadith services
│   ├── azkhar/         # Daily azkhar feature
│   │   ├── components/   # Azkhar components
│   │   ├── hooks/        # Azkhar hooks
│   │   └── services/     # Azkhar services
│   └── kids/           # Kids zone features
│       ├── components/   # Kids components
│       ├── hooks/        # Kids hooks
│       └── services/     # Kids services
├── pages/               # Route components
├── contexts/            # Global contexts
├── hooks/               # Global hooks
├── services/            # Global services
├── utils/               # Utility functions
├── constants/           # App constants
├── types/               # TypeScript types (if using TS)
└── styles/              # Global styles
    ├── globals.css
    ├── variables.css
    └── components/
```

## Benefits
1. **Scalability** - Easy to find and modify features
2. **Maintainability** - Clear separation of concerns
3. **Reusability** - Shared components in common/ui
4. **Testing** - Easier to test feature-specific code
5. **Onboarding** - New developers can navigate easily

## Migration Steps
1. Create new folder structure
2. Move components to appropriate feature folders
3. Extract business logic into hooks
4. Create service layers for API calls
5. Update import paths
6. Test thoroughly
7. Remove old empty folders
