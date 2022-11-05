"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MentorSchema = void 0;
const mongoose = require("mongoose");
exports.MentorSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    linkedinURL: String,
    twitterURL: String,
    industries: { type: (Array), required: true },
    accelerators: { type: (Array), required: true }
});
//# sourceMappingURL=mentor.model.js.map