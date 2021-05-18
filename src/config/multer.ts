import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';

export const MulterConfigs: MulterOptions = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const uploadPath: string = './upload';

      if (!existsSync(uploadPath)) mkdirSync(uploadPath);
      if (!existsSync(`${uploadPath}/noticeFiles`))
        mkdirSync(`${uploadPath}/noticeFiles`);
      if (!existsSync(`${uploadPath}/reportFiles`))
        mkdirSync(`${uploadPath}/reportFiles`);

      if (file.fieldname == 'noticeFile') {
        cb(null, `${process.cwd()}/upload/noticeFiles/`);
      } else if (file.fieldname == 'reportFile') {
        cb(null, `${process.cwd()}/upload/reportFiles/`);
      } else {
        cb(null, `${process.cwd()}/upload/`);
      }
    },

    filename: (req, file, cb) => {
      cb(null, `${new Date().valueOf()} ${file.originalname}`);
    },
  }),
};
