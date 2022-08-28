"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const resize_img_1 = require("../controllers/resize-img");
const cacge_middleware_1 = __importDefault(require("../middlewares/cacge.middleware"));
const router = express_1.Router();
// server side routes
router.get('api/images', cacge_middleware_1.default(300), validation_middleware_1.validationMiddelware, resize_img_1.resizeImage);
//call handel
router.get('/', (req, res) => {
    res.json({ message: 'Server is running and you can call apis.' });
});
exports.default = router;
