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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// create a request object
const request = supertest_1.default(server_1.default);
// test resize request with name without width and height
describe('Test endpoint response', () => {
    it('Status Codes tests', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=hn&width=500&height=500');
        expect(response.status).toBe(200);
    }));
    //check all query params
    it('should enter width if undefined', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=hn&width=&height=45');
        expect(response.status).toBe(404);
    }));
    //check all query params
    it('should enter height if undefined', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=hn&width=500&height=');
        expect(response.status).toBe(404);
    }));
    //check all query params
    it('should enter filename if undefined', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=&width=500&height=41');
        expect(response.status).toBe(404);
    }));
});
// test resizing image
describe('Test endpoint response', () => {
    it('test resizing image', () => __awaiter(void 0, void 0, void 0, function* () {
        // get most recent file added
        const getMostRecentFile = (dir) => {
            const files = orderReccentFiles(dir);
            return files.length ? files[0] : undefined;
        };
        const orderReccentFiles = (dir) => {
            return fs_1.default
                .readdirSync(dir)
                .filter((file) => fs_1.default.lstatSync(path_1.default.join(dir, file)).isFile())
                .map((file) => ({
                file,
                mtime: fs_1.default.lstatSync(path_1.default.join(dir, file)).mtime,
            }))
                .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
        };
        const file = getMostRecentFile(`${path_1.default.resolve('./')}/assets/modified-images`);
        //start test
        yield request
            .get('/api/images?filename=&width=500&height=41')
            .query({ filename: 'hn', width: 500, height: 41 });
        const existingFile = fs_1.default.existsSync(`${path_1.default.resolve('./')}/assets/modified-images/${file === null || file === void 0 ? void 0 : file.file}`);
        expect(existingFile).toBe(true);
    }));
});
