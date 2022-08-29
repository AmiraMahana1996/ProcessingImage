"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddelware = void 0;
const messages_1 = __importDefault(require("../messages/messages"));
const validation_rules_1 = __importDefault(require("../validation/validation.rules"));
exports.validationMiddelware = (req, res, next) => {
    //convert type of width and height
    const data = {
        filename: req.query.filename,
        width: req.query.width,
        height: req.query.height,
    };
    //validation
    for (const [key, value] of Object.entries(data)) {
        switch (validation_rules_1.default(data)) {
            case 'nullOrZero':
                return res.status(404).json(messages_1.default(key).invalidInput);
            case 'empty':
                return res.status(404).json(messages_1.default(value).requiredInput);
            case 'negativeValue':
                return res.status(404).json(messages_1.default(key).negativeValue);
            case 'notFound':
                return res.status(404).json(messages_1.default(key).notFound);
            case 'required':
                return res.json(messages_1.default(data).requiredInput);
            case 'valid':
                next();
                return res.status(200);
            default:
                next();
        }
        return;
    }
    next();
};
