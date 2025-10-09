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

        await sharp(inputPath)
          .resize(1280, 1080, {
            fit: 'inside',
            withoutEnlargement: true
          })
          .webp({ quality: 85 })
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
