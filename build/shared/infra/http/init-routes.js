"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initExpressRoutes = void 0;
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const fileUpload = require("express-fileupload");
const v1_1 = require("./api/v1");
function initExpressRoutes(server) {
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
    server.express.use('/api/v1', v1_1.v1Router);
    server.express.get('/', (req, res) => {
        return res.json({ message: "Success init route" });
    });
    server.express.post('/upload-avatar', async (req, res) => {
        // console.log("test")
        try {
            if (!req.files) {
                res.send({
                    status: false,
                    message: 'No file uploaded'
                });
            }
            else {
                // console.log(req.files)
                //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
                let avatar = req.files.avatar;
                // console.log(avatar)
                //Use the mv() method to place the file in upload directory (i.e. "uploads")
                // @ts-ignore
                avatar.mv('./uploads/' + avatar.name);
                //send response
                // @ts-ignore
                res.send({
                    status: true,
                    message: 'File is uploaded',
                    data: {
                        // @ts-ignore
                        name: avatar.name,
                        // @ts-ignore
                        mimetype: avatar.mimetype,
                        // @ts-ignore
                        size: avatar.size
                    }
                });
            }
        }
        catch (err) {
            res.status(500).send(err);
        }
    });
}
exports.initExpressRoutes = initExpressRoutes;
//# sourceMappingURL=init-routes.js.map