---
name: Add Testing Infrastructure
overview: Add comprehensive testing setup with Vitest for unit/integration tests and Playwright for E2E tests, including test files for all components and the main App integration.
todos:
  - id: setup-vitest
    content: Create vitest.config.ts and add Vitest dependencies to package.json
    status: completed
  - id: setup-playwright
    content: Create tests/e2e/playwright.config.ts and add Playwright dependencies
    status: completed
  - id: unit-header
    content: Create tests/unit/Header.test.tsx with rendering tests
    status: completed
  - id: unit-nameinput
    content: Create tests/unit/NameInput.test.tsx with input/button interaction tests
    status: completed
  - id: unit-greeting
    content: Create tests/unit/Greeting.test.tsx with conditional rendering tests
    status: completed
  - id: integration-app
    content: Create tests/integration/App.test.tsx with full component integration tests
    status: completed
  - id: e2e-app
    content: Create tests/e2e/app.spec.ts with Playwright E2E tests for user flows
    status: completed
  - id: update-scripts
    content: Add test scripts to package.json (test, test:ui, test:e2e, test:e2e:ui, test:e2e:ci)
    status: completed
---

# Testing Infrastructure Plan

## Overview

Add a complete testing setup with three layers:

1. **Unit Tests** - Test individual components in isolation
2. **Integration Tests** - Test component interactions in App
3. **E2E Tests** - Test full user flows with Playwright

## File Structure

```
vibe-app-01/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── NameInput.tsx
│   │   └── Greeting.tsx
│   ├── App.tsx
│   └── main.tsx
├── tests/
│   ├── unit/
│   │   ├── Header.test.tsx          # Unit test
│   │   ├── NameInput.test.tsx       # Unit test
│   │   └── Greeting.test.tsx        # Unit test
│   ├── integration/
│   │   └── App.test.tsx             # Integration test
│   └── e2e/
│       ├── app.spec.ts              # E2E test
│       └── playwright.config.ts    # Playwright config
├── vitest.config.ts                 # Vitest config
└── package.json                     # Add test scripts & deps
```

## Implementation Details

### 1. Unit Tests (Vitest + React Testing Library)

**Location**: `tests/unit/` directory

**Header.test.tsx**:

- Renders the title text correctly
- Contains "Welcome" and "to Vibe App" text

**NameInput.test.tsx**:

- Renders input and button
- Updates input value when typing
- Calls `onNameChange` when input changes
- Calls `onGo` when button clicked
- Calls `onGo` when Enter key pressed
- Displays current `name` prop value

**Greeting.test.tsx**:

- Renders nothing when `typedText` is empty and `isTyping` is false
- Displays `typedText` when provided
- Shows cursor (`|`) when `isTyping` is true
- Hides cursor when `isTyping` is false

### 2. Integration Test (Vitest + React Testing Library)

**Location**: `tests/integration/` directory

**App.test.tsx**:

- Renders all components (Header, NameInput, Greeting)
- User can type name in input
- Clicking "Go" button triggers greeting
- Pressing Enter triggers greeting
- Typing animation displays correctly
- Empty name doesn't trigger greeting
- State flows correctly between components

### 3. E2E Test (Playwright)

**Location**: `tests/e2e/` directory

**app.spec.ts**:

- Page loads successfully
- User can see the input field and button
- User can type name and click "Go"
- Greeting appears with typing animation
- User can type name and press Enter
- Empty submission doesn't show greeting
- Multiple submissions work correctly

### 4. Configuration Files

**vitest.config.ts**:

- Configure Vitest to work with Vite
- Set up React Testing Library environment
- Configure test file patterns to include `tests/**/*.test.tsx`
- Set up path aliases for `src/` imports in test files

**tests/e2e/playwright.config.ts**:

- Configure Playwright for E2E tests
- Set base URL to dev server (or production URL for CI)
- Configure browsers (Chromium, Firefox, WebKit)
- Set up test timeouts
- Configure headless mode for CI environments
- Set up retry logic for flaky tests

**package.json updates**:

- Add test scripts: `test`, `test:ui`, `test:e2e`, `test:e2e:ui`
- Add dependencies: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jsdom`, `@playwright/test`

## Test Execution Strategy

- **Unit/Integration**: Run with `npm test` (Vitest)
- **E2E**: Run with `npm run test:e2e` (Playwright)
- **Watch mode**: `npm run test:watch` for development
- **CI/CD**: Tests can be run in CI pipeline (CI configuration not included in this plan)

## Dependencies to Add

**DevDependencies**:

- `vitest` - Test runner (works with Vite)
- `@testing-library/react` - React component testing
- `@testing-library/jest-dom` - DOM matchers
- `@testing-library/user-event` - User interaction simulation
- `jsdom` - DOM environment for tests
- `@playwright/test` - E2E testing framework
- `@vitest/ui` - Test UI (optional, for visual test runner)

## Test Coverage Goals

- Unit tests: 100% component coverage
- Integration: Full App component flow
- E2E: Critical user paths (name input → greeting display)