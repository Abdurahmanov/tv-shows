# tv-shows

This project is built using Vue 3, Vite, and TypeScript.

## Prerequisites
- [Node.js](https://nodejs.org/) Ensure you have Node.js installed. The project supports Node.js versions ^20.19.0 || >=22.12.0.
- [yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/) package manager

## Features
- **Home Page with Categorized Shows**: Browse TV shows grouped by genres like Action, Comedy, and Drama.
- **Search Functionality**: Search for TV shows by name.
- **Show Details Page**: See full information about a selected show.
- **Add to Favorites and Remove from Favorites**: Add and remove shows from your favorites list (saved in local storage).
- **Responsive Design**: Works smoothly on desktop and mobile devices.
- **State Management**: Uses Pinia for handling app data.
- **Sanitized HTML Rendering**: DOMPurify is used to sanitize HTML content to prevent XSS attacks.

## Architecture Decisions
- **Vue 3** – chosen for its reactive data model, component-based structure, and ease of scalability. 
- **Vite** – provides a fast development environment and optimized production builds. 
- **TypeScript** – adds static typing for better maintainability and reliability of the codebase. 
- **Pinia** – lightweight and official state management library for Vue 3, offering clear API and TypeScript support. 
- **Vue Router** – handles navigation between views (Home, Details, Favorites). 
- **SCSS** – used for custom styling and better organization of reusable design variables. 
- **DOMPurify** – ensures safe HTML rendering by preventing XSS vulnerabilities.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
