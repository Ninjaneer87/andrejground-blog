---
title: 'Set up React, TypeScript and Tailwind in Vite '
isDraft: false
pubDate: 2024-09-08
author: 'andrej_forgac'
metaImage: 'react-vite-tailwind-ts.webp'
image: 'r-t-t-v.webp'
tags: ['react', 'typescript', 'tailwind', 'vite']
id: set-up-react-tailwind-typescript-in-vite
stackblitzProjectId: ''
---

In this article, we will set up a development environment for a react project using <b>Vite</b>, <b>React</b>, <b>TypeScript</b> and <b>Tailwind</b>.

This is probably the most used boilerplate code when it comes to react apps nowadays.

## Create the project

Open your terminal of choice and go to the repo where you want to create your project.

Once there, use the following command to create the project:

```zsh
npm create vite@latest
```

You will be prompted the following:

- Project name: `my-vite-project`
- Select a framework: `React`
- Select a variant: `TypeScript`

Now go to this newly created repo, install dependencies and start the development server:

```zsh
cd my-vite-project && npm i && npm run dev
```

Your project should be up and running at <a href="http://localhost:5173/" target="_blank">localhost:5173 &#8599;</a>

## Install Tailwind CSS

Time to install tailwind and some other required dependencies

```zsh
npm i -D tailwindcss postcss autoprefixer
```

This command means following:

- `-D` - install the following as dev-dependencies
- `tailwind` - Tailwind CSS framework
- `postcss` - Tool for transforming Tailwind directives into fully generated, optimized styles
- `autoprefixer` - PostCSS plugin that automatically adds vendor prefixes to your CSS, ensuring compatibility across different browsers

## Generate Tailwind configuration files

To start using the tailwind, we need to create configuration files, namely `tailwind.config.js` and `postcss.config.js`.

We can create them manually, but why would we, when there's a command which will do that for us:

```zsh
npx tailwind init -p
```

## Configure Tailwind source paths

In this step we specify the paths of files which will contain tailwind classes, otherwise the styles won't be applied.

We do that by adding `"./index.html"` and `"./src/**/*.{js,ts,jsx,tsx}"` to `content` array in `tailwind.config.js`

```js
/* tailwind.config.js */

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"] // <---
    theme: {
        extend: {},
    },
    plugins: [],
}
```

## Add `@tailwind` directives

Add these directives to the top of your `index.css` file (or what ever your root CSS file is)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

This directive imports Tailwind’s pre-designed layers (base, components, and utilities) into your CSS file.

- `@tailwind base;` - Imports base styles (resets and foundational styles)
- `@tailwind components;` - Imports reusable components (pre-designed classes)
- `@tailwind utilities;` - Imports utility classes (spacing, text sizes, colors, etc.)

## Start using Tailwind

Open your `App.tsx` file and start using tailwind classes

```tsx
function App() {
  return <h1 className="text-red-500 bg-gray-800">My Vite Project</h1>;
}

export default App;
```

Happy coding! 🫡