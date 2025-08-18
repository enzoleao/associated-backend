import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';

/**
 * Apply the file interceptor to the decorator.
 *
 * @param uploadDir - destination location of the route intercepted by the file grabber
 * @returns A method decorator for the specified endpoint.
 */
export function applyCreateFileInterceptor(uploadDir: string) {
  const uploadPath = `./uploads/${uploadDir}`;

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  return UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: uploadPath,
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
      fileFilter: (req, file, callback) => {
        if (!['image/jpeg', 'image/png'].includes(file.mimetype)) {
          return callback(
            new Error('Apenas imagens JPEG ou PNG são permitidas'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  );
}
