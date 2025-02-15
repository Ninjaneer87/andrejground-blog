---
title: 'Set up React, TypeScript and Tailwind in Vite'
isDraft: false
pubDate: 2024-09-08
author: 'andrej_forgac'
metaImage: 'react-vite-tailwind-ts.webp'
image: 'r-t-t-v.webp'
tags: ['react', 'typescript', 'tailwind', 'vite']
id: setup-react-with-typescript-tailwind-in-vite
stackblitzProjectId: ''
---

In this article, we will set up a development environment for a react project using <b>Vite</b>, <b>React</b>, <b>TypeScript</b> and <b>Tailwind</b>.

## Create a Vite project

Open your terminal of choice and go to the repo where you want to create your project.

Once there, use the following command to create the project:

```zsh
npm create vite@latest
```

You will be prompted the following:

- Project name: `vite-project`
- Select a framework: `React`
- Select a variant: `TypeScript`

Now go to this newly created repo and install dependencies:

```zsh
cd vite-project && npm i
```

## Install Tailwind CSS

Install `tailwindcss` and `@tailwindcss/vite` via npm.

```zsh
npm install tailwindcss @tailwindcss/vite
```

## Start the development server

Open the project in your editor and run the development server

```zsh
code . && npm run dev
```

Your project should be up and running at <a href="http://localhost:5173/" target="_blank">localhost:5173 &#8599;</a>

## Configure the Vite plugin

Add the `tailwindcss` plugin to your Vite configuration.

```ts {3} title="vite.config.ts" /tailwindcss()/
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})

```

## Import Tailwind CSS

Add an `@import` to your base CSS file that imports Tailwind CSS.

```css title="index.css"
@import 'tailwindcss';
```

## Start using Tailwind

Open your `App.tsx` file and start using tailwind classes

```tsx title="App.tsx" /text-red-500/ /bg-gray-800/
function App() {
  return <h1 className="text-red-500 bg-gray-800">My Vite Project</h1>;
}

export default App;
```

Happy coding! 🫡
