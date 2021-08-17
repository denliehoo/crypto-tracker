"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// import passportLocalMongoose from "passport-local-mongoose";
const usersSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });
// usersSchema.plugin(passportLocalMongoose);
exports.default = mongoose_1.model("User", usersSchema);
