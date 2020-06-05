"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initExpressRoutes = void 0;
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
function initExpressRoutes(server) {
    server.express.use(cors({ origin: '*' }));
    server.express.use(bodyParser.json());
    server.express.use(bodyParser.urlencoded({ extended: true }));
    server.express.use(compression());
    server.express.use(helmet());
    server.express.use(morgan('tiny'));
    // server.express.use('/api/v1', v1Router);
    server.express.get('/', (req, res) => {
        return res.json({ message: "Success init route" });
    });
}
exports.initExpressRoutes = initExpressRoutes;
//# sourceMappingURL=init-routes.js.map