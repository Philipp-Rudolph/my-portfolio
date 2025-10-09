import sharp from 'sharp';
import { existsSync } from 'fs';
import { extname, join, dirname, basename } from 'path';
import { mkdir } from 'fs/promises';

export default function vitePluginWebP() {
  return {
    name: 'vite-plugin-webp',
    enforce: 'pre',

    async transform(code, id) {
      // Only process image imports in JS/Vue files
      const supportedFormats = ['.jpg', '.jpeg', '.png', '.gif'];
      const ext = extname(id).toLowerCase();

      // Check if this is an image file being imported
      if (supportedFormats.includes(ext)) {
        const webpPath = id.replace(ext, '.webp');

        // Generate WebP version if it doesn't exist
        if (!existsSync(webpPath)) {
          try {
            const dir = dirname(webpPath);
            await mkdir(dir, { recursive: true });

            await sharp(id)
              .resize(1280, 1080, {
                fit: 'cover',
                position: 'center'
              })
              .webp({ quality: 85 })
              .toFile(webpPath);

            console.log(`✓ Generated WebP: ${basename(webpPath)}`);
          } catch (error) {
            console.error(`Error converting ${id} to WebP:`, error);
          }
        }

        // Update the import to use the WebP version
        return {
          code: `export default "${webpPath}"`,
          map: null
        };
      }

      return null;
    },

    configureServer(server) {
      // Watch for new images and convert them
      server.watcher.on('add', async (path) => {
        const supportedFormats = ['.jpg', '.jpeg', '.png', '.gif'];
        const ext = extname(path).toLowerCase();

        if (supportedFormats.includes(ext) && path.includes('public')) {
          const webpPath = path.replace(ext, '.webp');

          if (!existsSync(webpPath)) {
            try {
              await sharp(path)
                .resize(1280, 1080, {
                  fit: 'cover',
                  position: 'center'
                })
                .webp({ quality: 85 })
                .toFile(webpPath);

              console.log(`✓ Auto-converted to WebP: ${basename(webpPath)}`);
            } catch (error) {
              console.error(`Error auto-converting ${path} to WebP:`, error);
            }
          }
        }
      });
    }
  };
}
