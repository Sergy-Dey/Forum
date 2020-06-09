import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as swaggerUi from 'swagger-ui-express';
import { Server } from './app';
import * as path from 'path';

import * as fileUpload from 'express-fileupload';

import { v1Router } from './api/v1';

export function initExpressRoutes(server: Server) {
  server.express.use(cors({ origin: '*' }));
  server.express.use(bodyParser.json());
  server.express.use(bodyParser.urlencoded({ extended: true }));
  server.express.use(compression());
  server.express.use(helmet());
  server.express.use(morgan('tiny'));

  // enable files upload
  server.express.use(fileUpload({
    createParentPath: true
  }));

  server.express.use('/api/docs', swaggerUi.serve);
  server.express.use('/api/docs', swaggerUi.setup(require(path.join(__dirname, '../../../../docs/swagger.json'))));

  server.express.use('/api/v1', v1Router);

  server.express.get('/', (req, res) => {
    return res.json({ message: "Success init route" });
  });

  server.express.post('/upload-avatar', async (req, res) => {
    // console.log("test")
    try {
      if(!req.files) {
        res.send({
          status: false,
          message: 'No file uploaded'
        });
      } else {
        // console.log(req.files)
        //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
        let avatar: fileUpload.UploadedFile = req.files.avatar as fileUpload.UploadedFile;

        //Use the mv() method to place the file in upload directory (i.e. "uploads")
        await avatar.mv('./uploads/' + avatar.name);

        //send response
        res.send({
          status: true,
          message: 'File is uploaded',
          data: {
            name: avatar.name,
            mimetype: avatar.mimetype,
            size: avatar.size
          }
        });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });
}

