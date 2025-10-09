import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join, extname, basename } from 'path';

const publicDir = './public';
const supportedFormats = ['.jpg', '.jpeg', '.png', '.gif'];

async function convertImagesToWebP() {
  try {
    const files = await readdir(publicDir);

    for (const file of files) {
      const ext = extname(file).toLowerCase();

      // Skip SVG files and already converted WebP files
      if (ext === '.svg' || ext === '.webp') {
        continue;
      }

      if (supportedFormats.includes(ext)) {
        const inputPath = join(publicDir, file);
        const outputFileName = basename(file, ext) + '.webp';
        const outputPath = join(publicDir, outputFileName);

        console.log(`Converting ${file} to ${outputFileName}...`);

        const isPreview = file.includes('.preview');
        console.log(` - Detected as ${isPreview ? 'preview' : 'standard'} image.`);
        const resizeOptions = isPreview
          ? { width: 715, height: 403, fit: 'inside', withoutEnlargement: true }
          : { width: 1280, height: 1080, fit: 'inside', withoutEnlargement: true };
        const webpQuality = isPreview ? 70 : 85;

        await sharp(inputPath)
          .resize(resizeOptions)
          .webp({ quality: webpQuality })
          .toFile(outputPath);

        console.log(`✓ Converted ${file} to ${outputFileName}`);
      }
    }

    console.log('\n✓ All images converted successfully!');
  } catch (error) {
    console.error('Error converting images:', error);
    process.exit(1);
  }
}

convertImagesToWebP();
