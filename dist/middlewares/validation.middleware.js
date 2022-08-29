"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddelware = void 0;
const messages_1 = __importDefault(require("../messages/messages"));
const validation_rules_1 = __importDefault(require("../validation/validation.rules"));
exports.validationMiddelware = (req, res, next) => {
    const data = {
        filename: req.query.filename,
        width: req.query.width,
        height: req.query.height,
    };
    //validation
    for (const [key, value] of Object.entries(data)) {
        switch (validation_rules_1.default(data)) {
            case 'nullOrZero':
                res.status(404).json(messages_1.default(key).invalidInput);
                break;
            case 'empty':
                res.status(404).json(messages_1.default(value).requiredInput);
                break;
            case 'negativeValue':
                res.status(404).send(messages_1.default(key).negativeValue);
                break;
            case 'notFound':
                res.status(404).json(messages_1.default(key).notFound);
                break;
            case 'required':
                res.status(404).json(messages_1.default(data).requiredInput);
                break;
            case 'notalphabetic':
                res.status(404).json(messages_1.default(data).notalphabetic);
                break;
            case 'NotNumber':
                res.status(404).json(messages_1.default(data).NotNumber);
                break;
            case 'DimNotNumber':
                res.status(404).json(messages_1.default(data).DimNotNumber);
                break;
            default:
                next();
        }
        break;
    }
};
