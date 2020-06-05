"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
app.use("*", (req, res) => {
    res.json({
        status: 200,
        message: 'Success run server ...',
    });
});
app.listen(PORT, () => console.log(`hosting @${PORT}`));
//# sourceMappingURL=index.js.map