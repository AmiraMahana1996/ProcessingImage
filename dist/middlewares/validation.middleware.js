"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddelware = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validationMiddelware = (req, res, next) => {
    var _a;
    const Schema = joi_1.default.object({
        filename: joi_1.default.string(),
        width: joi_1.default.number(),
        height: joi_1.default.number(),
    });
    const val = (_a = Schema.validate(req.query).error) === null || _a === void 0 ? void 0 : _a.message;
    if (val !== undefined) {
        console.log(Schema.validate(req.query).error);
        res.json(val);
    }
    else {
        next();
    }
};
// the movie talk about suffring to achive the goal and satisfiction
//
// ant the suffring when any person have a dream
