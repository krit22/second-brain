"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Content = exports.contentTypes = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.contentTypes = ['image', 'video', 'article', 'audio', 'document']; // Extend as needed
const contentSchema = new mongoose_1.default.Schema({
    link: { type: String, required: true },
    type: { type: String, enum: exports.contentTypes, required: true },
    title: { type: String, required: true },
    tags: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Tag' }],
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
});
exports.Content = mongoose_1.default.model('Content', contentSchema);
//# sourceMappingURL=content.js.map