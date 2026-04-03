"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = void 0;
const mongoose = require('mongoose');
const tagSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true }
});
exports.Tag = mongoose.model('Tag', tagSchema);
//# sourceMappingURL=Tags.js.map