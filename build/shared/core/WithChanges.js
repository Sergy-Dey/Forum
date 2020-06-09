"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Changes = void 0;
const Result_1 = require("./Result");
class Changes {
    constructor() {
        this.changes = [];
    }
    addChange(result) {
        this.changes.push(result);
    }
    getChangeResult() {
        return Result_1.Result.combine(this.changes);
    }
}
exports.Changes = Changes;
//# sourceMappingURL=WithChanges.js.map