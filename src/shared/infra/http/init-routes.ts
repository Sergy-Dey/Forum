import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as swaggerUi from 'swagger-ui-express';
import { Server } from './app';



export function initExpressRoutes(server: Server) {
  server.express.use(cors({ origin: '*' }));
  server.express.use(bodyParser.json());
  server.express.use(bodyParser.urlencoded({ extended: true }));
  server.express.use(compression());
  server.express.use(helmet());
  server.express.use(morgan('tiny'));

  server.express.use('/api/docs', swaggerUi.serve);
  server.express.use('/api/docs', swaggerUi.setup(require('./swagger.json')));

  // server.express.use('/api/v1', v1Router);

  server.express.get('/', (req, res) => {
    return res.json({ message: "Success init route" });
  });
}

