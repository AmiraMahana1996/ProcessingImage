"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddelware = void 0;
const Joi = __importStar(require("joi"));
exports.validationMiddelware = (req, res, next) => {
    var _a;
    const Schema = Joi.object({
        name: Joi.string(),
        height: Joi.number(),
        width: Joi.number(),
    });
    const val = (_a = Schema.validate(req.body).error) === null || _a === void 0 ? void 0 : _a.message;
    if (val !== undefined) {
        req.flash('message', val);
        res.redirect('/message');
    }
    next();
};
// the movie talk about suffring to achive the goal and satisfiction
//
// ant the suffring when any person have a dream
