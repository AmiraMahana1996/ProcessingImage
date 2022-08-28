"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.resizeImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filename, width, height } = req.query;
    if (!fs_1.default.existsSync(`${path_1.default.resolve('./')}/assets/images/${filename}.png`)) {
        res.json({ message: `This image doesn't exist` });
    }
    else {
        yield sharp_1.default(`${path_1.default.resolve('./')}/assets/images/${filename}.png`)
            .resize({
            width: Number(width),
            height: Number(height),
        })
            .toFile(`${path_1.default.resolve('./')}/assets/modified-images/hn-resized.png`)
            .then(() => {
            res.sendFile(path_1.default.resolve(`assets/modified-images/${filename}-resized.png`));
        });
    }
});
