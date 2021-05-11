import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';

export const MulterConfigs: MulterOptions = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const uploadPath: string = './upload';

      if (!existsSync(uploadPath)) mkdirSync(uploadPath);
      cb(null, uploadPath);
    },

    filename: (req, file, cb) => {
      cb(null, `${new Date().valueOf()} ${file.originalname}`);
    },
  }),
};
