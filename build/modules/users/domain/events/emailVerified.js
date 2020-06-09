"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailVerified = void 0;
class EmailVerified {
    constructor(user) {
        this.dateTimeOccurred = new Date();
        this.user = user;
    }
    getAggregateId() {
        return this.user.id;
    }
}
exports.EmailVerified = EmailVerified;
//# sourceMappingURL=emailVerified.js.map