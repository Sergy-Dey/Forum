"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreated = void 0;
class UserCreated {
    constructor(user) {
        this.dateTimeOccurred = new Date();
        this.user = user;
    }
    getAggregateId() {
        return this.user.id;
    }
}
exports.UserCreated = UserCreated;
//# sourceMappingURL=userCreated.js.map