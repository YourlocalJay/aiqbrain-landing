import { build } from 'esbuild';
import fs from 'fs/promises';
import path from 'path';

// Clean dist directory
await fs.rm('dist', { recursive: true, force: true });
await fs.mkdir('dist', { recursive: true });

// Build worker
await build({
  entryPoints: ['src/index.js'],
  bundle: true,
  outfile: 'dist/index.js',
  format: 'esm',
  target: 'es2022',
  minify: true,
  sourcemap: false,
  external: ['cloudflare:*'],
});

// Copy static assets
try {
  await fs.cp('src/pages', 'dist/pages', { recursive: true });
} catch (e) {
  console.log('No pages directory to copy');
}

try {
  await fs.cp('src/assets', 'dist/assets', { recursive: true });
} catch (e) {
  console.log('No assets directory to copy');
}

console.log('✅ Build complete');