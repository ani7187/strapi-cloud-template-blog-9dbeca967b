import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const uploadsDir = path.join(strapi.dirs.static.public, 'uploads');

export default () => ({
  /**
   * Validate filename for security (no traversal, only safe chars)
   */
  isValidFileName(fileName: string): boolean {
    return (
      !fileName.includes('..') &&
      !fileName.includes('/') &&
      !fileName.includes('\\') &&
      /^[a-zA-Z0-9_.-]+$/.test(fileName) &&
      fileName.length < 255
    );
  },

  /**
   * Parse filename and extract dimensions
   */
  parseFileName(fileName: string) {
    const ext = path.extname(fileName);
    const baseName = path.basename(fileName, ext);

    const match = baseName.match(/(.+?)_(?:w(\d+)|h(\d+)|(\d+)x(\d+))$/);
    if (!match) return { baseName, width: undefined, height: undefined, ext };

    const [, name, w1, h1, w2, h2] = match;
    return {
      originalFile: `${name}${ext}`,
      baseName: name,
      width: w1 ? +w1 : w2 ? +w2 : undefined,
      height: h1 ? +h1 : h2 ? +h2 : undefined,
      ext,
    };
  },

  /**
   * Check if original file exists
   */
  async isExistOriginalFile(filePath: string): Promise<string | null> {
    try {
      const fullPath = path.join(uploadsDir, filePath);
      await fs.promises.access(fullPath, fs.constants.F_OK);
      return filePath;
    } catch (error) {
      return null;
    }
  },

  /**
   * Build resized filename consistently
   */
  buildResizedFileName(base: string, width?: number, height?: number, ext?: string) {
    if (width && height) return `${base}_${width}x${height}${ext}`;
    if (width) return `${base}_w${width}${ext}`;
    if (height) return `${base}_h${height}${ext}`;
    return `${base}${ext}`;
  },

  /**
   * Check if file exists and redirect if it does
   */
  checkFileExists(fileParam: string): string | null {
    const targetPath = path.join(uploadsDir, fileParam);
    if (fs.existsSync(targetPath)) {
      return `/uploads/${fileParam}`;
    }
    return null;
  },

  /**
   * Generate resized image
   */
  async generateResizedImage(
    originalPath: string,
    resizedPath: string,
    width: number,
    height: number
  ): Promise<void> {
    await sharp(originalPath)
      .resize({ width, height, fit: 'inside', withoutEnlargement: true })  //'fill' Stretch to exact box (can distort)
      .toFile(resizedPath);
  },

  /**
   * Main resize logic
   */
  async resizeImage(fileParam: string) {
    if (!this.isValidFileName(fileParam)) {
      throw new Error('Invalid file name');
    }

    // Check if resized file already exists
    const existingPath = this.checkFileExists(fileParam);
    if (existingPath) {
      return { redirect: existingPath };
    }

    const { originalFile, baseName, width, height, ext } = this.parseFileName(fileParam);

    // Find original file securely
    const isExist = await this.isExistOriginalFile(originalFile);
    if (!isExist) {
      throw new Error('Original image not found');
    }

    const originalPath = path.join(uploadsDir, originalFile);
    const resizedFileName = this.buildResizedFileName(baseName, width, height, ext);
    const resizedPath = path.join(uploadsDir, resizedFileName);

    // Generate resized image if missing
    if (!fs.existsSync(resizedPath)) {
      await this.generateResizedImage(originalPath, resizedPath, width, height);
    }

    return { redirect: `/uploads/${resizedFileName}` };
  },
});