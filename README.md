# p5.js

## Installation

```bash
node -v # Check if node is installed
npm -v # Check if npm is installed
```

```bash
npm init -y # Create a package.json file
npm install vite # Install Vite
npm install p5 # Install p5.js
```

```javascript
// vite.config.js

import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src', // root directory for the project
  base: './', // base path for the project
  build: {
    outDir: '../dist', // output directory for the build
    emptyOutDir: true, // clean the output directory before building
    chunkSizeWarningLimit: 1500, // warn when the bundle size exceeds 1500KB
  }
});
```

```bash
npm install tweakpane
```

