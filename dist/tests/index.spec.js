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
const joi_1 = __importDefault(require("joi"));
// create a request object
const request = supertest_1.default(server_1.default);
const Schema = joi_1.default.object({
    name: joi_1.default.string(),
    height: joi_1.default.number().required(),
    width: joi_1.default.number(),
});
// test resize request with name without width and height
describe('Test endpoint response', () => {
    it('post the / resize-img', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post('/resize-img')
            .send({ name: 'img test' })
            .redirects(1);
        expect(response.status).toBe(404);
    }));
});
// test resize request with name and width without height
describe('Test endpoint response', () => {
    it('post the / resize', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post('/resize-img')
            .send({ name: 'img test', width: 10 });
        expect(response.status).toBe(404);
    }));
});
// test resize request if width and height was string
describe('Test endpoint response', () => {
    it('post the / resize', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post('/resize-img')
            .send({ name: 'img test', width: '10', height: '50' });
        expect(response.status).toBe(404);
    }));
});
// test resize request if height was string
describe('Test endpoint response', () => {
    it('post the / resize', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        yield request.post('/resize-img').send({ name: 'img test', width: 10 });
        expect((_a = Schema.validate({ name: 'img test', width: 10 }).error) === null || _a === void 0 ? void 0 : _a.message).toBe('"height" is required');
    }));
});
// test resize request if height was string
describe('Test endpoint response', () => {
    it('post the /resize-img', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        yield request
            .post('/resize-img')
            .send({ name: 'img test', width: 50, height: 50 })
            .redirects(1);
        expect((_a = Schema.validate({ name: 'img test', width: 50, height: 50 }).error) === null || _a === void 0 ? void 0 : _a.message).toBe(undefined);
    }));
});
