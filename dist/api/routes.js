"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validation_middleware_1 = require("../middlewares/validation.middleware");
const resize_img_1 = require("../controllers/resize-img");
const caching_1 = __importDefault(require("../cache/caching"));
const router = express_1.default.Router();
// server side routes
router.post('/resize-img', caching_1.default(300), validation_middleware_1.validationMiddelware, resize_img_1.resizeImage);
router.get('/message', (req, res) => {
    res.send(req.flash('message'));
});
router.get('/', (req, res) => {
    res.render('index', {
        title: 'process img',
    });
});
exports.default = router;
