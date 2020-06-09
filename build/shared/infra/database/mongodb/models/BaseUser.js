"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseUser = exports.BaseUserSchema = void 0;
const mongoose_1 = require("mongoose");
exports.BaseUserSchema = new mongoose_1.Schema({
    base_user_id: { type: String, required: true, unique: true },
    user_email: { type: String, required: true, unique: true },
    is_email_verified: { type: Boolean, default: false },
    is_admin_user: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
    username: String,
    user_password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    token: { type: String, default: null },
    tokenExpiredTime: { type: String, default: null },
}, {
    timestamps: true,
});
exports.BaseUserSchema.index({ user_email: 1 }, { unique: true, dropDups: true });
exports.BaseUser = mongoose_1.model('BaseUser', exports.BaseUserSchema);
//# sourceMappingURL=BaseUser.js.map