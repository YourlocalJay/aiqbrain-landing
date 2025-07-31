import { build } from 'esbuild';
import fs from 'fs/promises';
import path from 'path';

// Clean dist directory
await fs.rm('dist', { recursive: true, force: true });
await fs.mkdir('dist', { recursive: true });

// Build worker - corrected path to point to root index.js
await build({
  entryPoints: ['index.js'],
  bundle: true,
  outfile: 'dist/index.js',
  format: 'esm',
  target: 'es2022',
  minify: true,
  sourcemap: false,
  external: ['cloudflare:*'],
});

// Copy static assets from various directories
const assetDirs = ['images', 'vault', 'request'];

for (const dir of assetDirs) {
  try {
    await fs.cp(dir, `dist/${dir}`, { recursive: true });
    console.log(`✅ Copied ${dir} directory`);
  } catch (e) {
    console.log(`⚠️ No ${dir} directory to copy`);
  }
}

console.log('✅ Build complete');
