"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDeleted = void 0;
class UserDeleted {
    constructor(user) {
        this.dateTimeOccurred = new Date();
        this.user = user;
    }
    getAggregateId() {
        return this.user.id;
    }
}
exports.UserDeleted = UserDeleted;
//# sourceMappingURL=userDeleted.js.map